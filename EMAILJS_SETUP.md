# Configuration EmailJS pour le formulaire de contact

## Étapes pour activer le formulaire de contact :

### 1. Créer un compte EmailJS
- Allez sur [emailjs.com](https://www.emailjs.com/)
- Créez un compte gratuit (100 emails/mois)

### 2. Configurer le service email
- Dans le dashboard, allez dans "Email Services"
- Ajoutez votre service email (Gmail, Outlook, etc.)
- Notez votre **SERVICE_ID**

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Créez un nouveau template avec ces variables :
  - `{{from_name}}` - Nom du visiteur
  - `{{from_email}}` - Email du visiteur  
  - `{{message}}` - Message du visiteur
- Notez votre **TEMPLATE_ID**

### 4. Obtenir votre clé publique
- Allez dans "Account" > "General"
- Copiez votre **PUBLIC_KEY**

### 5. Mettre à jour le code
Dans le fichier `script.js`, remplacez :
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Remplacez par votre clé publique
```

Et :
```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

### 6. Tester
- Déployez sur GitHub Pages
- Testez le formulaire de contact

## Alternative : Formspree
Si vous préférez Formspree :
1. Créez un compte sur [formspree.io](https://formspree.io/)
2. Remplacez l'attribut `action` du formulaire par l'URL Formspree
3. Ajoutez `method="POST"` au formulaire

## Sécurité et bonnes pratiques

### Protection de la clé publique
La clé publique EmailJS est conçue pour être exposée côté client, mais vous pouvez :

1. **Restrictions de domaine** (Recommandé)
   - Dans EmailJS > Account > Security
   - Ajoutez votre domaine GitHub Pages : `https://votre-nom.github.io`
   - Limitez l'usage à ce domaine uniquement

2. **Variables d'environnement** (Pour les builds)
   ```javascript
   // Si vous utilisez un build system
   emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
   ```

3. **Limitations de taux**
   - EmailJS limite automatiquement les envois
   - Plan gratuit : 100 emails/mois
   - Surveillez votre usage dans le dashboard

### Mesures de sécurité supplémentaires
- **Validation côté serveur** : EmailJS valide les templates
- **Anti-spam** : Ajoutez un captcha si nécessaire
- **Monitoring** : Surveillez les logs EmailJS
- **Rate limiting** : Limitez les soumissions par IP

### Alternative plus sécurisée
Si vous voulez plus de contrôle, utilisez **Netlify Forms** ou **Formspree** qui gèrent la sécurité côté serveur.

Le formulaire est maintenant prêt à être configuré !