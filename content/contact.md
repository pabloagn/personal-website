---
title: "Contact"
layout: "contact"
---

# Get in Touch

<form class="contact-form" name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  
  <label>
    Your Name
    <input type="text" name="name" required />
  </label>

  <label>
    Your Email
    <input type="email" name="email" required />
  </label>

  <label>
    Message
    <textarea name="message" rows="6" required></textarea>
  </label>

  <button type="submit" class="btn btn--primary">Send Message</button>
</form>

