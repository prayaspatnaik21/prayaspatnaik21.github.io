---
layout: default
title: Blog
---

# Blog

Technical articles about perception engineering, image processing, and software optimization.

{% assign sorted_posts = site.posts | sort: "date" | reverse %}

{% if sorted_posts.size > 0 %}
<div class="blog-list">
    {% for post in sorted_posts %}
    <article class="blog-item">
        <h2>
            <a href="{{ post.url }}">{{ post.title }}</a>
        </h2>
        <div class="blog-meta">
            <span class="date">{{ post.date | date: "%B %d, %Y" }}</span>
            {% if post.category %}
            <span class="category">{{ post.category }}</span>
            {% endif %}
            {% if post.reading_time %}
            <span class="reading-time">{{ post.reading_time }} min read</span>
            {% endif %}
        </div>
        <p>{{ post.excerpt }}</p>
        <a href="{{ post.url }}" class="read-more">Read More →</a>
    </article>
    {% endfor %}
</div>
{% else %}
<p>No blog posts yet. Check back soon!</p>
{% endif %}
