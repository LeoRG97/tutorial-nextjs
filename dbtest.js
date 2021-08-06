const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database
}).then(async (db) => {
    // do your thing
    await db.migrate({
        force: true
    })
    const people = await db.all('SELECT * FROM Person');
    console.log('ALL PEOPLE', JSON.stringify(people, null, 2));

    const vehicles = await db.all('SELECT * FROM Vehicle');
    console.log('ALL VEHICLES', JSON.stringify(vehicles, null, 2));
})
