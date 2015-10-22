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
```

## Clone repositories

```
$ git clone https://github.com/masters-info-nantes/CRATE.git
$ git clone https://github.com/masters-info-nantes/jquery-crate.git
$ git clone https://github.com/masters-info-nantes/crate-core.git
$ git clone https://github.com/masters-info-nantes/brace.git
```

## Build projects

- crate-core

```
$ cd crate-core
$ npm install
```

- jquery-crate

```
$ cd ../jquery-crate
$ npm install brfs
$ npm install 
$ npm run-script build
```

- Crate

```
$ cd ../CRATE
$ bower install 
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


