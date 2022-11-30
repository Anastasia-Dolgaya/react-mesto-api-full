const Card = require('../models/cards');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const newCard = new Card({
    name: req.body.name,
    link: req.body.link,
    owner: { _id: req.user._id },
  });

  newCard.save()
    .then(() => {
      Card
        .populate(newCard, { path: 'owner' })
        .then((c) => res.send(c));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // 400
        next(new ValidationError('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
      .orFail(new NotFoundError('Карточка не найдена.'));

    if (card.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('Пользователь не имеет прав на удаления чужой карточки.');
    }

    await card.delete();
    res.send({ message: 'Карточка удалена.' });
  } catch (err) {
    if (err.name === 'CastError') {
      // 400
      next(new BadRequestError('Передан некорректный id карточки.'));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new NotFoundError('Карточка не найдена'));
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      // 400
      next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
    } else {
      next(err);
    }
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new NotFoundError('Карточка не найдена'));
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      // 400
      next(new BadRequestError('Переданы некорректные данные для снятия лайка.'));
    } else {
      next(err);
    }
  }
};
