# Made.com Tech Blog

![Logo](https://media.made.com/mws-assets/images/placeholderLogo.1.png)

Use [MDX](https://github.com/mdx-js/mdx) with [Next.js](https://github.com/zeit/next.js)

## Getting Started

First, run the development server:

```bash
yarn install

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to write a Blog post

-   To start create a new `.md` file in the `posts` directory and name it starting with
    the date followed by an **understandable title** like:
    `YYYY-MM-DD-my-new-blog-post-title.md`

    The name of the file will be used as a slug in the url.

-   Add the metadata at the top of the file (title, author and tags for now). This data
    will be used in the rendering of the blog post.

    ```Markdown
    ---
    title: My new Amazing Post Title
    author: Me
    tags:
        - first
        - second
        - third
    ---
    ```

    You can have a look at [posts/\_example.md](posts/_example.md) to some hints about
    how to write with Markdown syntax.

-   Open a new PR with your new blog post and ask for a review in the
    [#guild-blog](https://app.slack.com/client/T08C8D2HH/CUD1RT5KR) slack channel!

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and
    API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
