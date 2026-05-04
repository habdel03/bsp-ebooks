// netlify/functions/subscribe.js
//
// Cette fonction tourne côté serveur (Netlify) et protège ta clé API Brevo.
//
// INSTALLATION :
// 1. Crée le dossier   netlify/functions/   dans ton repo GitHub
// 2. Mets ce fichier dedans : subscribe.js
// 3. Dans Netlify → Site configuration → Environment variables → Add variable :
//    Key:   BREVO_API_KEY
//    Value: (ta clé API Brevo — Brevo > Settings > API Keys > Generate)
// 4. Push sur GitHub → Netlify redéploie automatiquement ✅

exports.handler = async function(event) {

  // Seulement POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // CORS — autorise ton domaine
  const headers = {
    'Access-Control-Allow-Origin': 'https://bsp-ebooks.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  let name, email, listId;
  try {
    const body = JSON.parse(event.body || '{}');
    name   = (body.name   || '').trim();
    email  = (body.email  || '').trim();
    listId = parseInt(body.listId) || 8;
  } catch(e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'JSON invalide' }) };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email invalide' }) };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY manquante dans les variables d\'environnement Netlify');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Configuration serveur manquante' }) };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          PRENOM: name,
          SMS: '',           // laisser vide si pas de SMS
          SOURCE: 'BSP Website'
        },
        listIds: [listId],
        updateEnabled: true  // met à jour si le contact existe déjà
      })
    });

    const status = response.status;

    // 201 = créé, 204 = mis à jour
    if (status === 201 || status === 204) {
      console.log(`Nouvel inscrit : ${email}`);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Inscription réussie' })
      };
    }

    const data = await response.json();

    // Contact déjà existant → succès quand même
    if (data.code === 'duplicate_parameter') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Déjà inscrit' })
      };
    }

    console.error('Erreur Brevo:', data);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: data.message || 'Erreur Brevo' })
    };

  } catch(err) {
    console.error('Erreur réseau Brevo:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur de connexion au serveur' })
    };
  }
};
