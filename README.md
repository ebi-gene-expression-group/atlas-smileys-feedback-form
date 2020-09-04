# This component has been permanently moved to the [Atlas Components monorepo](https://github.com/ebi-gene-expression-group/atlas-components)

# Atlas Feedback Form [![Coverage Status]

## Description
This feedback form is triggered by clicking a right-side button, which contains a mandatory five-scale smiley score bar
and a link to an externally-served feedback form.

The smiley score is sent to **Google Analytics** as an event.


## Dependencies
The feedback button uses an icon from [EBI Icon Fonts](https://www.ebi.ac.uk/style-lab/general/fonts/v1.3/). In case
you don’t include them in your environment nothing will be shown, only the *Feedback* label text. Have a look at
`/html/index.html` for more details. To deploy in production remember to add `react-popup.css` as well.


## Run it on your browser
Use Webpack-Dev-Server:
```
npm install
npx webpack-dev-server -d
```
