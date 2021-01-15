const uuid = require('uuid');
const moment = require('moment');

const isEmpty = (value) => value.trim() === '';
const isURL = (value) => /^https?:\/\//.test(value); // https://swapi.py4e.com/api/starships/9/

class NaveEspacial {
  /**
   * A nave espacial
   */
  constructor({
    nombre, // string: The name of this starship. The common name, such as Death Star.
    modelo, // string: The model or official name of this starship. Such as T-65 X-wing or DS-1 Orbital Battle Station.
    fabricante, // string: The manufacturer of this starship. Comma seperated if more than one.
    costoEnCreditos, // number: The cost of this starship new, in galactic credits.
    longitud, // number: The length of this starship in meters.
    maxVelocidadAmostferica = 'n/a', // string: The maximum speed of this starship in atmosphere. n/a if this starship is incapable of atmosphering flight.
    tripulacion, // number: The number of personnel needed to run or pilot this starship.
    pasajeros, // number: The number of non-essential people this starship can transport.
    capacidadCarga, // number: The maximum number of kilograms that this starship can transport.
    consumibles, // string: The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.
    clase = 'Deep Space Mobile Battlestation', // string: The class of this starship, such as Starfighter or Deep Space Mobile Battlestation.
    pilotos = [], // array: An array of People URL Resources that this starship has been piloted by.
    peliculas = [], // array: An array of Film URL Resources that this starship has appeared in.
    url, // string: The hypermedia URL of this resource.
    creado = null,
    editado = null,
  }) {
    this.id = uuid.v1();
    this.nombre = nombre;
    this.modelo = modelo;
    this.fabricante = fabricante;
    this.costoEnCreditos = Number(costoEnCreditos);
    this.longitud = Number(longitud);
    this.maxVelocidadAmostferica = maxVelocidadAmostferica;
    this.tripulacion = Number(tripulacion);
    this.pasajeros = Number(pasajeros);
    this.capacidadCarga = Number(capacidadCarga);
    this.consumibles = consumibles;
    this.clase = clase;
    this.pilotos = pilotos;
    this.peliculas = peliculas;
    this.url = url;
    this.creado = creado || moment().format('YYY-MM-DD HH:mm:ss');
    this.editado = editado || moment().format('YYY-MM-DD HH:mm:ss');
  }

  validate() {
    const messages = [];

    if (typeof this.nombre !== 'string' || isEmpty(this.nombre)) {
      messages.push('The name field is invalid');
    }

    if (typeof this.modelo !== 'string' || isEmpty(this.modelo)) {
      messages.push('The model field is invalid');
    }

    if (typeof this.fabricante !== 'string' || isEmpty(this.fabricante)) {
      messages.push('The manufacturer field is invalid');
    }

    if (typeof this.costoEnCreditos !== 'number') {
      messages.push('The cost_in_credits field is invalid');
    }

    if (typeof this.longitud !== 'number') {
      messages.push('The length field is invalid');
    }

    if (typeof this.maxVelocidadAmostferica !== 'string' || isEmpty(this.maxVelocidadAmostferica)) {
      messages.push('The max_atmosphering_speed field is invalid');
    }

    if (typeof this.tripulacion !== 'number') {
      messages.push('The crew field is invalid');
    }

    if (typeof this.pasajeros !== 'number') {
      messages.push('The passengers field is invalid');
    }

    if (typeof this.capacidadCarga !== 'number') {
      messages.push('The cargo_capacity field is invalid');
    }

    if (typeof this.consumibles !== 'string' || isEmpty(this.consumibles)) {
      messages.push('The consumables field is invalid');
    }

    if (typeof this.clase !== 'string' || isEmpty(this.clase)) {
      messages.push('The starship_class field is invalid');
    }

    if (!Array.isArray(this.pilotos) || (this.pilotos.length && !this.pilotos.every(isURL))) {
      messages.push('The pilots field is invalid');
    }

    if (!Array.isArray(this.peliculas) || (this.peliculas.length && !this.peliculas.every(isURL))) {
      messages.push('The pilots field is invalid');
    }

    if (typeof this.url !== 'string' || !isURL(this.url)) {
      messages.push('The URL field is invalid');
    }

    return messages;
  }

  toJSON() {
    const fields = {};

    Object.keys(this).forEach((key) => {
      fields[key] = this[key];
    });

    return fields;
  }
}

module.exports = NaveEspacial;
