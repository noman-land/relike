# ReLike

Embeddable universal like button, powered by Ethereum. Any web3 enabled browser can be used to "like" anything in the world.

## How to use

Embed this script anywhere on your web page to instantly get universal liking functionality. Put the script in the exact place you want the ReLike button to show up, as the script replaces itself with the button.

    <script
      id="relike--universal-like-button--entrypoint" 
      data-entity-id="https://some-url-to-like.com"
      src="https://git.noman.land/noman/relike/blob/master/build/app.js"
    ></script>

The `data-entity-id` attribute that is passed will be the entity that is "like"d. Ideally the `data-entity-id` is an IPFS hash and can therefore be anything from an article, to a photo, to a video or song, or any data whatsoever that you want to "like".

## Development

1. Start testrpc and pick a unique network ID to use over and over
 
    `testrpc --network-id 3172`
 
    Get the mnemonic and in MetaMask, click forget password on the lock screen and paste in your mnemonic. You'll have one account with 100 eth in it. You can create nine more and they will all have 100 eth in them.
 
    Later you can start your testrpc with the same mnenomic to get the same account that are already imported into MetaMask.
  
    `testrpc -m="acid put legend otter clump abandon wool praise digital actual ghost trail" --network-id 3172`
   
2. Use truffle to compile your contracts and deploy updated ones to the network

    `truffle compile && truffle migrate`

### Pushing gh-pages branch

1. Build your app with updated addresses for newly deployed (updated) contracts

    `npm run build`

2. Push just the build folder to gh-pages

    `git subtree push --prefix dist origin gh-pages`
