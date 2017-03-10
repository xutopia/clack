Want to help make clack better? Here are some general guidelines:

# Git Workflow

Fork the repo at [github.com/asyncApes/clack](https://github.com/asyncApes/clack)

Clone the fork locally

	$ git clone https://github.com/asyncApes/clack

Set up your upstream repo:

	$ git remote add upstream https://github.com/asyncApes/clack

Create a new branch

	$ git checkout -b [your-branch-name-here]

Make commits to your branch, taking care to make sure that any changes you make are relevant only to the branch you're working on. Try to keep commit messages under 70 characters, and please prefix them with one of the following:

- [feature]
- [bugfix]
- [update] 
- [refactor]
- [cleanup]
- [testing]
- [docs]

Before submitting a pull request, you must first rebase upstream changes into your branch:

	$ git pull --rebase upstream dev

Fix all merge conflicts, if necessary. Submit all pull requests to the dev branch. Please include a short description of your changes.

Thank you for contributing to clack!
