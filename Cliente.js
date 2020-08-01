var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var general;
(function (general) {
    var Cliente = /** @class */ (function (_super) {
        __extends(Cliente, _super);
        function Cliente(id, nombre, apellido, edad, sexo) {
            var _this = _super.call(this, id, nombre, apellido, edad) || this;
            _this.sexo = sexo;
            return _this;
        }
        Cliente.prototype.getSexo = function () {
            return this.sexo;
        };
        return Cliente;
    }(general.Persona));
    general.Cliente = Cliente;
    var sexo;
    (function (sexo) {
        sexo["Masculino"] = "Masculino";
        sexo["Femenino"] = "Femenino";
    })(sexo = general.sexo || (general.sexo = {}));
})(general || (general = {}));
