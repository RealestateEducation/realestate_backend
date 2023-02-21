/* eslint-disable prettier/prettier */
const { Card, Set } = require("../models")
const ApiError = require('../utils/APIError');
const httpStatus = require('http-status');
var mongoose = require('mongoose');

const createCard = async (body) => {
  const order = await Card.create(body);
  const cards = await Card.find({ setId: body.setId })
//   const product = await Set.findById(body.setId)
//   Object.assign(product, { totalCards: cards.length });
  await Set.findByIdAndUpdate(body.setId , { totalCards: cards.length })
//   await product.save()
  return order;
}

const getCardByFavorite = async (query) => {
  const { id, category} = query
  const resp = await Card.find({
    'favorites': {
      $in: [
        mongoose.Types.ObjectId(id)
      ]
    },
    'category': category
  })
  return resp;
}

const getCard = async () => {
  return Card.find();
};
const queryCards = async (
  filter,
  options,
) => {
  const products = Card.paginate(
    filter,
    options,
  );
  return products;
};

const getCardById = async id => {
  return Card.findById(id);
};
const deleteManyCards = async (
  filter,
) => {
  const products = Card.deleteMany(
    filter,
);
  return products;
};
const deleteCard = async (id) => {

  const card = await getCardById(id);
  if (!card) {
    return 'Cannot find Card'
  }
  const setId = card.setId;
  await card.remove();

  const cards = await Card.find({ setId: setId })
  await Set.findByIdAndUpdate(setId , { totalCards: cards.length })
  return card;
}


const getCardByLimit = async ({ start, end, category }) => {
  const diff = parseInt(end) - parseInt(start)
  const response = await Card.find({ category, premium: false }).skip(parseInt(start)).limit(diff)
  return response;
};

const flashCardStatistics = async (id) => {
  let setsPercentage = [];
  const allCards = await Card.find(
    {
      category: 'card'
    }
  )
  const attemptedFlashCards = await Card.find(
    {
      category: 'card',
      'visitors': {
        $in: [
          mongoose.Types.ObjectId(id),
        ]
      }
    }
  )
  const allSets = await Set.find(
    {
      subject:'cards'
    }
  )
  for (var a = 0; a < allSets.length; a++) {
    const totalSetCards = await Card.find(
      {
       setId : allSets[a].id
      }
    )
    const attemptedSetCards = await Card.find(
      {
        setId: allSets[a].id,
        'visitors': {
          $in: [
            mongoose.Types.ObjectId(id),
          ]
        }
      }
    )
   const percentage ={
    percentage:  Math.round((attemptedSetCards.length*100)/totalSetCards.length)
   }

    setsPercentage = [
      ...setsPercentage,
      percentage
    ]
  }
  return {
    allFlashCard: Math.round((attemptedFlashCards.length * 100) / allCards.length),
    setsPercentage: setsPercentage
    
  }
};


const vocabularyStatistics = async (id) => {
  let setsPercentage = [];
  const allCards = await Card.find(
    {
      category: 'vocabulary'
    }
  )

  const attemptedFlashCards = await Card.find(
    {
      category: 'vocabulary',
      'visitors': {
        $in: [
          mongoose.Types.ObjectId(id),
        ]
      }
    }
  )

  const allSets = await Set.find(
    {
      subject: 'vocabulary'
    }
  )
  for (var a = 0; a < allSets.length; a++) {
    const totalSetCards = await Card.find(
      {
        setId: allSets[a].id
      }
    )
    const attemptedSetCards = await Card.find(
      {
        setId: allSets[a].id,
        'visitors': {
          $in: [
            mongoose.Types.ObjectId(id),
          ]
        }
      }
    )
    const percentage = {
      percentage: Math.round((attemptedSetCards.length * 100) / totalSetCards.length)
    }

    setsPercentage = [
      ...setsPercentage,
      percentage
    ]
  }
  return {
    allVocabulary: Math.round((attemptedFlashCards.length * 100) / allCards.length),
    setsPercentage: setsPercentage
  }
};


const updateCardById = async (id, update) => {
  const product = await getCardById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Card not found.');
  }
  Object.assign(product, update);
  await product.save();
  return product;
};

const resetCardsData = async (id) => {
  await Card.updateMany(
    {
    },
    {
      $pull: {
        favorites: id,
      },
    }
  )
  await Card.updateMany(
    {
    },
    {
      $pull: {
        visitors: id,
      },
    }
  )

  console.log("CHal gya.....")
};


module.exports = {
  createCard, getCard,
  queryCards,
  getCardByFavorite,
  updateCardById,
  getCardByLimit,
  flashCardStatistics,
  vocabularyStatistics,
  deleteCard,
  deleteManyCards,
  resetCardsData
};
