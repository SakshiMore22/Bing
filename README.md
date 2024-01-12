# Getting Started with Create React App
bundler : create-react-app (webpack)
commands : npm install create-react-app
npx create-react-app bing

<!-- git commands: -->
git init
git add .
git commit -m "Comment here"
git remote add origin https://github.com/YourRepoPrefixHere.git
git push -u origin master

<!-- to merge master & main: -->
git:(master) git branch main
git:(master) git checkout main
git:(main) git pull origin master
git:(main) git checkout master
git:(master) git pull

git pull --rebase
git push --set-upstream origin main
git push -f origin main
