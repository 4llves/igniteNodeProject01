import fs from 'node:fs'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  // constructor() {
  //   fs.readFile(databasePath, 'utf8')
  //     .then(data => {
  //         this.#database = JSON.parse(data)
  //     })
  //     .catch (() => {
  //         this.#persist()
  //     })
  // } 

  constructor() {
    try {
      const data = fs.readFileSync(databasePath, 'utf8');
      this.#database = JSON.parse(data);
    } catch (error) {
      this.#persist();
    }
  }

  #persist() {
    fs.writeFile(
      databasePath, JSON.stringify(this.#database),
      (e) => { console.log(e)}
    )
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else { 
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }
}
