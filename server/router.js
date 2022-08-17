const express = require('express');
const router = express.Router();
let User = require('./models/user');
let Comment = require('./models/comments');
let Vote = require('./models/votes');
let Tag = require('./models/tags');
let Question = require('./models/questions');
let Answer = require('./models/answers');
const bcrypt = require('bcrypt');

async function checkLogin (req, res, next) {
  req.session.user ? next() : res.sendStatus(400);
}

router.post('/register', async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    res.sendStatus(400);
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    await new User(req.body).save();
    res.sendStatus(201);
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.sendStatus(400);
  } else {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = user;
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.sendStatus(200);
});

router.get('/me', async (req, res) => {
  if (req.session.user) {
    res.json(await User.findById(req.session.user._id));
  } else {
    res.json(null);
  }
});

router.put('/rep/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    $inc: { rep: req.body.rep }
  });
  res.sendStatus(200);
});

// handle question
router.get('/questions', async (req, res) => {
  const questionlist = await Question.find()
    .populate('tags asked_by comments answers votes')
    .populate({
      path: 'answers',
      populate: {
        path: 'ans_by'
      }
    })
    .populate({
      path: 'answers',
      populate: {
        path: 'votes'
      }
    })
    .populate({
      path: 'answers',
      populate: {
        path: 'comments',
        populate: {
          path: 'com_by'
        }
      }
    })
    .populate({
      path: 'comments',
      populate: { path: 'com_by' }
    });
  res.send(questionlist);
});

router.post('/questions', checkLogin, async (req, res, next) => {
  try {
    const newquestion = new Question({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      asked_by: req.session.user._id,
    });
    await newquestion.save();
    res.send(newquestion);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put('/questions/:_id', checkLogin, async (req, res, next) => {
  // console.log('1');
  try {
    // console.log('0');
    const question = await Question.findByIdAndUpdate({ _id: req.params._id }, req.body);
    // const index = await Question.findIndex(q => q._id == req.params._id)
    res.send(question);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete('/questions/:id', async function (req, res) {
  await Question.findByIdAndRemove(req.params.id);
  res.sendStatus(200);
});

// handle tags
router.get('/tags', async (req, res) => {
  const tags = await Tag.find();
  res.send(tags);
});

router.post('/tags', checkLogin, async (req, res, next) => {
  try {
    const newtag = new Tag({
      name: req.body.name,
      created_by: req.session.user._id
    });
    await newtag.save();
    res.send(newtag);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put('/tags/:_id', checkLogin, async (req, res, next) => {
  // console.log('1');
  try {
    // console.log('0');
    const t = await Tag.findByIdAndUpdate({ _id: req.params._id }, req.body);
    // const index = await Question.findIndex(q => q._id == req.params._id)
    res.send(t);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete('/tags/:id', async function (req, res) {
  await Tag.findByIdAndRemove(req.params.id);
  await Question.updateMany({}, { $pullAll: { tags: [req.params.id], } });
  res.sendStatus(200);
});

// handle answer
router.get('/answers', async (req, res) => {
  const answers = await Answer.find()
    .populate('ans_by comments votes')
    .populate({
      path: 'comments',
      populate: { path: 'com_by' }
    });
  res.send(answers);
});

router.post('/answers', checkLogin, async (req, res, next) => {
  const newanswer = new Answer({
    text: req.body.text,
    ans_by: req.session.user._id
  });
  await newanswer.save();
  res.send(newanswer);
});

router.put('/answers/:_id', checkLogin, async (req, res, next) => {
  // console.log('1');
  try {
    // console.log('0');
    const answer = await Answer.findByIdAndUpdate({ _id: req.params._id }, req.body);
    // const index = await Question.findIndex(q => q._id == req.params._id)
    res.send(answer);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete('/answer/:id', async function (req, res) {
  await Answer.findByIdAndRemove(req.params.id);
  await Question.updateMany({}, { $pullAll: { answers: [req.params.id], } });
  res.sendStatus(200);
});

router.post('/comment', checkLogin, async (req, res, next) => {
  const data = new Comment({
    text: req.body.text,
    com_by: req.session.user._id
  });
  await data.save();
  res.send(data);
});

router.post('/vote', checkLogin, async (req, res, next) => {
  const data = new Vote({
    type: req.body.type,
    vote_by: req.session.user._id
  });
  await data.save();
  res.send(data);
});

module.exports = router;