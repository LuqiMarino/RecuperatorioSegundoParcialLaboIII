var general;
(function (general) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido, edad) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        Persona.prototype.getEdad = function () {
            return this.edad;
        };
        Persona.prototype.getID = function () {
            return this.id;
        };
        return Persona;
    }());
    general.Persona = Persona;
})(general || (general = {}));
