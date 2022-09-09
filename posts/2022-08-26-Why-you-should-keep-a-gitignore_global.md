---
title: Why you should keep a .gitignore_global
author: Gil
tags:
    - developer experience
---

Some editors create temporary files and folders to keep track of a project (example:
`.idea` for PyCharm), some OS create temporary files and folders for thumbnails
(example: `.DS_STORE` on macs). While those files are probably useful for you, they
don’t really relate to the git project you’re working on, but sometimes we end up adding
them to the git repo by accident because we forgot to add a `.gitignore` file in the
project.

But while a `.gitignore` can help keep those unnecessary files (for the project) out of
the git repo, since those files aren’t related to the project at all, I don’t think they
should be even in the `.gitignore`. If I use pycharm, and you use vim, why should a repo
shared between should care what editors we use? What if we were working in a project
with 10 developers and each of them had their own esoteric OS/editor combo that left
files, do we keep track of them in the `.gitignore`? What if you now want to split that
monolith into multiple services?

There's a solution to this, it’s the `.gitignore_global` file, you can keep this file
anywhere you like and configure your .gitconfig to point to it. Here’s
[mine](https://github.com/LuRsT/Setup/blob/master/dotfiles/.gitignore_global), you can
use it for inspiration. You can now remove the `.idea`/`.DS_STORE` out of your projects
`.gitignore` and next time someone adds them to your project’s `.gitignore`, nudge them
to this article.
