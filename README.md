# *** WORK IN PROGRESS ***

# ReLike

## What is this?

I think I'm going to call this the first standalone decentralized feature. dfeature? deature? It isn't a whole dapp, it's just a feature. 

It's a universal liking/disliking service that is open source, decentralized, and can be freely used by anyone in any application. It allows you to publicly record "likes" and "dislikes" against any arbitrary string of text. This is anything from "cat" or "dog" to "Terminator 3" to "🍕" to "QmW84daiALvufneDcjDeoTFKR1bGQuHFUFv1fcSSRpmuCN" to "https://www.theguardian.com/sport/2017/jun/10/nba-finals-cleveland-cavaliers-golden-state-warriors-game-4". The sky is the limit. In its alpha stage it's very permissive so something is bound to break. 

It's also built so that dapp developers can easily integrate it into their dapps. Now any dapp can embed this feature and they're instantly plugged into the same liking data that every other dapp on the planet is using. 

When a user joins a new service that implements this feature, all their liking data from all their other services are still in the exact same place, and any new likes on this new service will persist across every other service they use. They are just interfacing with the data through different mediums, in whatever context they desire.

## What actually is it?

First, it is the `ReLike.sol` smart contract that runs on Ethereum. At the moment it is deployed on the Ropsten testnet at <THIS ADDRESS> and the code for it is <HERE>. It's the brain of the liking service and it has such killer features as `like()`, `unLike()`, and even the hot new `dislike()` and `unDislike()`. Also, such other classics as `getLikeById()`. This thing stores all the data for the _entire world_ of likers and dislikers.

Secondly, it's the `ReLikeUtils.js` Javascript library on npm that allows you to interface with the ReLike service from your Javascript apps. It has all the same classics like `like()` and `unLike()`, etc.

You can instantiate it like so:


    // code


There are some overrides that you can optionally give it.

<DESCRIBE>

Thirdly, it's a `ReLikeCard.js` React component that you can import into your dapps and get from npm. It looks like this.

<SCREENSHOT>

It plugs itself into `ReLikeUtils` and basically is a small component that displays the public like/dislike tallies for any string it's given as a `prop`.

It gets instantiated like so:

<CODE>

Fourthly, it's a script tag that you can drop into your non-React dapp. This is for non-React people who would still like an easy way to add this feature to their app. Any web app that embeds this feature gets immediate access to Ethereum on any web3 enabled browser, such as Status or Mist or Chrome with the MetaMask extension installed. Here's how you use it:

Embed this script anywhere on your web page to instantly get universal liking functionality. Put the script in the exact place you want the ReLike button to show up, as the script replaces itself with the button.

    <script
      id="relike--universal-like-button--entrypoint" 
      data-entity-id="https://some-url-to-like.com"
      src="https://git.noman.land/noman/relike/blob/master/build/app.js"
    ></script>

The `data-entity-id` attribute that is passed will be the entity that is "like"d. Ideally the `data-entity-id` is an IPFS hash and can therefore be anything from an article, to a photo, to a video or song, or any data whatsoever that you want to "like".

Fifthly it's a Status optimized web app that lets you search for things, see how other people like them and then like things yourself.

<SCREENSHOT>

## But what's the point?

With just a couple hundred lines of code you can build small features that can be cobbled together to build complex and compelling applications. These applications can share all their data and infrastructure, but only as programmed and when confirmed or rejected by the user. 

This means that with ReLike you are one import away from including permanent, secure, and decentralized liking functionality into your app. Be it a social network, or a photo sharing app, or a recipe app, etc. All "liking" of all things in the world is done in one place. !?!?!?!?

## What now?

I would really like us to explore standalone decentralized features. Since all Ethereum applications live on the same computer, they can easily share things with each other without having to hop across massive infrastructure silos. Imagine trying to physically get an email from a Google database to a Yahoo database. Ethereum makes it so that all apps are in the same room with each other.

So if I make a small program that any other program can augment itself with, everyone on the entire network can benefit from that and have access to it immediately, and the cost of doing that is absorbed by the "gas" in the network that costs ether to buy. So if I'm a user and I want to use a liking service on any dapp on my device, I pay a small fee for every time I benefit from being able to interact with this program that enriches my life and social interactions. The fee doesn't go to any company, it goes in the form of microtransactions to the other users in the network who are enriching it and making it work accurately and securely. You pay only the specific people who make it possible for you to like things on this network. 

I imagine this to be a small piece in a larger ecosystem of interoperable pieces that are open for anyone to use and stitch together.

## Future ideas

 - [ ] Upgrade to 6-point scale
      1. Hated it
      2. Really disliked it
      3. Disliked it
      4. Liked it
      5. Really liked it
      6. Loved it

      Defaults might be 3 and 4 with options to go higher or lower with a cool UI. 

 - [ ] Status chatbot integration with `/share` command and embedded previews of content loading from IPFS or Swarm. This feature will make more sense once chatbots can be used inside group chats

 - [ ] Embed an actual ReLike React component directly into the Status interface. This could effectively make a universal liking functionality native to the Ethereum operating system

 - [ ] ReLike components in other frameworks like Angular, etc.

 - [ ] Integrate Whisper so people can talk to each other about what they like (and dislike)

 - [ ] zkSNARKS for shielding the contents of users' liking data

 - [ ] Users could choose to offer access to their data to third parties in exchange for payment over time

## Monetization? 😬

I think it might be fair for the developer of a feature to get a tiny fractional tax off of every interaction users have with the feature. I have no idea where on the spectrum that tax lies but I'm thinking in the hundredths of a penny. Though this could easily be thwarted by someone who just redeploys your feature without the tax and people use that instead. Maybe people could donate to bounties to make new features and feature-makers get paid that way (shoutout Commiteth). There are many fair, sane, and innovative ways to try it and I'm excited to see what people come up with.

## Unknowns/Questions/Learnings

 - Data needs to be migrated from version to version of the contract as it's upgraded. How best to do that?
 - What happens if there's another liking service? Do they just compete and the best one wins? Does data splinter off into many directions? Are there communities of people who share a small liking service together and only let certain people in?
 - Millions of fake accounts liking things. Can this be mitigated? Is "it's expensive to do that" the only answer?
 - Learning to build and deploy an Android app was fun and interesting
 - Ethereum is completely revolutionary

## Development

1. Start testrpc and pick a unique network ID to use over and over
 
    `testrpc --network-id 3172`
 
    Get the mnemonic and in MetaMask, click forget password on the lock screen and paste in your mnemonic. You'll have one account with 100 eth in it. You can create nine more and they will all have 100 eth in them.
 
    Later you can start your testrpc with the same mnenomic to get the same accounts that are already imported into MetaMask.
  
    `testrpc -m="put the mnenomic phrase generated by truffle in between these quotation marks" --network-id 3172`
   
2. Use truffle to compile your contracts and deploy updated ones to the network

    `truffle compile && truffle migrate`

3. Fire up `webpack-dev-server` and start the app on `localhost:8080` by default

    `npm run dev`

### Pushing gh-pages branch

1. Build your app with updated addresses for newly deployed (updated) contracts

    `npm run build`

2. Push just the build folder to gh-pages

    `git subtree push --prefix build origin gh-pages`
