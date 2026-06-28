---
layout: default
title: Blog
permalink: /blog/
---

<h1>Blog</h1>

{% for post in site.posts %}
  <div class="blog-card">
    <h2>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </h2>

    <p>{{ post.excerpt }}</p>

    <small>{{ post.date | date: "%B %d, %Y" }}</small>
  </div>

  <hr>
{% endfor %}