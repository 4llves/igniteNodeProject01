import fs from 'node:fs'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

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

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        // o que faz o Object.entries
        // {name: "Alves", email: "Alves"}
        // [['name', 'Alves'], ['email', 'Alves']]
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })
    }

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

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }
}
