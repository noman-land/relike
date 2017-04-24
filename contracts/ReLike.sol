pragma solidity ^0.4.8;

contract ReLike {
  enum Rating {
    UNRATED,
    LIKE,
    DISLIKE
  }

  struct Entity {
    uint likes;
    uint dislikes;
  }

  struct Like {
    Rating rating;
    uint index;
  }

  struct LikeList {
    string[] entityIds;
    mapping (string => Like) likes;
  }

  mapping (string => Entity) entities;
  mapping (address => LikeList) likeLists;

  event ItemLiked (address indexed user, string entityId, Rating rating);

  function hasLiked(string entityId) internal constant returns (bool) {
    return likeLists[msg.sender].likes[entityId].rating == Rating.LIKE;
  }

  function hasDisliked(string entityId) internal constant returns (bool) {
    return likeLists[msg.sender].likes[entityId].rating == Rating.DISLIKE;
  }

  function like(string entityId) {
    if (hasLiked(entityId)) throw;
    if (hasDisliked(entityId)) {
      entities[entityId].dislikes -= 1;
    } else {
      uint index = likeLists[msg.sender].entityIds.push(entityId) - 1;
      likeLists[msg.sender].likes[entityId].index = index;
    }
    likeLists[msg.sender].likes[entityId].rating = Rating.LIKE;
    entities[entityId].likes += 1;
    ItemLiked(msg.sender, entityId, Rating.LIKE);
  }

  function unLike(string entityId) {
    if (!hasLiked(entityId)) throw;
    string[] _entityIds = likeLists[msg.sender].entityIds;
    uint indexToUnlike = likeLists[msg.sender].likes[entityId].index;
    string entityIdToMove = _entityIds[_entityIds.length - 1];
    likeLists[msg.sender].entityIds[indexToUnlike] = entityIdToMove;
    likeLists[msg.sender].likes[entityIdToMove].index = indexToUnlike;
    likeLists[msg.sender].entityIds.length -= 1;
    delete likeLists[msg.sender].likes[entityId];
    entities[entityId].likes -= 1;
    ItemLiked(msg.sender, entityId, Rating.UNRATED);
  }

  function dislike(string entityId) {
    if (hasDisliked(entityId)) throw;
    if (hasLiked(entityId)) {
      entities[entityId].likes -= 1;
    } else {
      uint index = likeLists[msg.sender].entityIds.push(entityId) - 1;
      likeLists[msg.sender].likes[entityId].index = index;
    }
    likeLists[msg.sender].likes[entityId].rating = Rating.DISLIKE;
    entities[entityId].dislikes += 1;
    ItemLiked(msg.sender, entityId, Rating.DISLIKE);
  }

  function unDislike(string entityId) {
    if (!hasDisliked(entityId)) throw;
    string[] _entityIds = likeLists[msg.sender].entityIds;
    uint indexToUndislike = likeLists[msg.sender].likes[entityId].index;
    string entityIdToMove = _entityIds[_entityIds.length - 1];
    likeLists[msg.sender].entityIds[indexToUndislike] = entityIdToMove;
    likeLists[msg.sender].likes[entityIdToMove].index = indexToUndislike;
    likeLists[msg.sender].entityIds.length -= 1;
    delete likeLists[msg.sender].likes[entityId];
    entities[entityId].dislikes -= 1;
    ItemLiked(msg.sender, entityId, Rating.UNRATED);
  }

  function getLikeById(string entityId)
    constant
    returns (Rating rating, uint index)
  {
    return (
      likeLists[msg.sender].likes[entityId].rating,
      likeLists[msg.sender].likes[entityId].index
    );
  }

  function getLikeByIndex(uint index)
    constant
    returns (string entityId, Rating rating)
  {
    LikeList likeList = likeLists[msg.sender];
    string _entityId = likeList.entityIds[index];
    return (_entityId, likeList.likes[_entityId].rating);
  }

  function getEntity(string entityId)
    constant
    returns (uint likes, uint dislikes)
  {
    return (entities[entityId].likes, entities[entityId].dislikes);
  }

  function getLikeCount() constant returns (uint) {
    return likeLists[msg.sender].entityIds.length;
  }
}
