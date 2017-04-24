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
