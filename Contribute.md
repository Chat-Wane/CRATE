# Contribute

## Requirements
- npm

```
OSX: brew install npm
Display info: npm config set loglevel info
```
[Tuto npm install](https://docs.npmjs.com/getting-started/installing-node)

- bower

```
$ npm install -g bower
```

- NPM modules

```
$ npm install -g browserify
$ npm install -g uglifyjs 
$ npm install -g less
```

## Clone repositories

```
$ git clone https://github.com/masters-info-nantes/CRATE.git
$ git clone https://github.com/masters-info-nantes/jquery-crate.git
$ git clone https://github.com/masters-info-nantes/crate-core.git
```

## Build projects

- crate-core

```
$ cd crate-core
$ npm install
$ npm run build
```

- jquery-crate

Before build create-core if changes
Download lseqtree-0.3.4.tgz file [here](https://drive.google.com/file/d/0B_QCPjtg9ixRblRrX3A2Q0NwcEk/view?usp=sharing)
```
$ cd ../jquery-crate
$ npm link ../crate-core
$ npm install brfs
$ npm cache add lseqtree-0.3.4.tgz # lseqtree in npm is too fat https://github.com/Chat-Wane/CRATE/files/74787/lseqtree-0.3.4.tgz
$ npm install 
$ npm run build
$ bower link # to prepare a local repo
```

- Crate

Before build jquery-crate if changes
```
$ cd ../CRATE
$ bower link jquery-crate # to get the local repo jquery-crate
$ bower install
$ lessc css/style.less css/generatedstyle.css 
```


## Use behind proxy
### Bower
- Create a file named **.bowerrc** next to the **bower.json** in the project

```
{
	"proxy":"http://cache.etu.univ-nantes.fr:3128",
	"https-proxy":"http://cache.etu.univ-nantes.fr:3128"
}
```

### NPM

```
npm config set proxy http://cache.etu.univ-nantes.fr:3128
npm config set https-proxy http://cache.etu.univ-nantes.fr:3128
```


