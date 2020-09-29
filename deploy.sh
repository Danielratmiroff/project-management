# Steps to follow
# 1. Create 'gh-pages' branch and set it has source to build in Github (Github repository's Settings)
# 2. Create deploy.sh and replace it's ssh (git@github.com:...)
# 3. Create vue.config.js and add following:
#------ module.exports = {
#------   publicPath:
#------     process.env.NODE_ENV === "production" ? "/project-management/" : "/",
#------ };
# 4. Open project's folder with Git Bash and this file (run sh deploy.sh)

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'


# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Danielratmiroff/project-management.git master:gh-pages

cd -