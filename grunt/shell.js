'use strict'

const ghPagesList = ['dist/']

module.exports = {
  'git-is-clean': {
    // `$(git status --porcelain)` will evaluate to the empty string if the
    // working directory is clean.
    // `test -z` will exit 0 (true) if its argument is an empty string.
    // If it doesn't exit true, `(git status && false)` will show why the
    // repository isn't clean and exit false causing the grunt tasks to end.
    command: 'test -z "$(git status --porcelain)"  || (git status && false)'
  },
  'git-push-master': {
    command: 'git push origin master'
  },
  'git-checkout-master': {
    command: 'git checkout master'
  },
  'deploy-prepare': {
    command: [
      'git branch -D gh-pages || echo "so not removed"',
      'git checkout --orphan gh-pages',
      'git rm --cached \'*\'',
      'ember build --environment=production'
    ].join(' && ')
  },
  'deploy-dist': {
    command: 'git add --force dist/'
  },
  'deploy-publish-1': {
    command:'git commit -m "deploy task"'
  },
  'deploy-publish-2': {
    command: 'git subtree push --prefix dist origin gh-pages'
  },
  'deploy-publish-3': {
    command: 'git push origin :gh-pages'
  },
  'deploy-publish-4': {
    command: 'git subtree push --prefix dist origin gh-pages'
  },
  'deploy-publish-5': {
    command: 'git clean -x -d --force --exclude=node_modules'
  },
  'deploy-publish-6': {
    command: 'git checkout master'
  }
  'deploy-cleanup': {
    command: [
      'git clean -x -d --force --exclude=node_modules'
  }
}
