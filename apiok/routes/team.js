const express = require('express');
const router = express.Router();
const Team = require('../middleware/logger');


// Get all team
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const team = await Team.find(searchOptions);
        res.render('team/index', {
            team: team,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/');
    }
});

// New Team member
router.get('/new', (req, res) => {
    res.render('team/new', {team: new Team() }); 
});


// Create New Team'
router.post('/', async (req, res) => {
    const team = new Team({
        name: req.body.name,
        address: req.body.address,
        email:req.body.email
    });
    
    try {
        const newTeam = await team.save();
        res.redirect('team');
    } catch {
        res.render('team/new', {
            team: team,
            errorMessage: 'Error creating Team. Please, write Name and Email'
        });
        
    };
});




   
        
router.get('/', (req, res) => {
        res.send('Show Team' + req.params.id)
    });

router.get('/:id/edit', async (req, res) => {
    
     try {
        const team = await Team.findById(req.params.id)
        res.render('team/edit', { team: team() });
    } catch {
        res.redirect('/team')
    }
        
});

router.put('/:id', (req, res) => {
    res.send('Update Team' + req.params.id)
});

router.delete('/:id', (req, res) => {
    res.send('Delete Team' + req.params.id)
});
    




module.exports=router