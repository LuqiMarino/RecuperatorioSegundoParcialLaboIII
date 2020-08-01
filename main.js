var general;
(function (general) {
    window.addEventListener("load", function () {
        document.getElementById("btnLimpiar").addEventListener("click", LimpiarTabla);
        document.getElementById("btnAgregar").addEventListener("click", AgregarPersona);
        document.getElementById("btnEliminar").addEventListener("click", EliminarPersona);
        document.getElementById("btnCalcularPromedio").addEventListener("click", CalcularPromedio);
        document.getElementById("slcFiltro").addEventListener("change", FiltrarTabla);
        document.getElementById("chkID").addEventListener("change", MostrarCampos);
        document.getElementById("chkNombre").addEventListener("change", MostrarCampos);
        document.getElementById("chkApellido").addEventListener("change", MostrarCampos);
        document.getElementById("chkEdad").addEventListener("change", MostrarCampos);
        document.getElementById("chkSexo").addEventListener("change", MostrarCampos);
    });
    var listaPersonas = new Array();
    function AgregarPersona() {
        var nombre = document.getElementById("txtNombre").value;
        var apellido = document.getElementById("txtApellido").value;
        var edad = parseInt(document.getElementById("txtEdad").value);
        var id = GetProximoID();
        var cliente = new general.Cliente(id, nombre, apellido, edad, general.sexo.Masculino);
        var slcSexo = document.getElementById("slcSexo").value;
        if (slcSexo == "Femenino")
            cliente = new general.Cliente(id, nombre, apellido, edad, general.sexo.Femenino);
        if (CheckInputs()) {
            listaPersonas.push(cliente);
            AgregarALaTabla(cliente);
            alert("PERSONA AGREGADA CORRECTAMENTE");
        }
        else {
            alert("FALTAN CAMPOS POR COMPLETAR");
        }
    }
    function CheckInputs() {
        var nombre = document.getElementById("txtNombre").value;
        var apellido = document.getElementById("txtApellido").value;
        var edad = document.getElementById("txtEdad").value;
        var slcSexo = document.getElementById("slcSexo").value;
        if (nombre != "" && apellido != "" && edad != "" && slcSexo != "")
            return true;
        return false;
    }
    function AgregarALaTabla(cliente) {
        var body = document.getElementById("cuerpo");
        var tr = document.createElement('tr');
        var ID = document.createElement('td');
        ID.addEventListener("dblclick", LlenarABM);
        ID.setAttribute("name", "idTabla");
        ID.innerText = cliente.getID().toString();
        var nombre = document.createElement('td');
        nombre.addEventListener("dblclick", LlenarABM);
        nombre.setAttribute("name", "nombreTabla");
        nombre.innerText = cliente.getNombre();
        var apellido = document.createElement('td');
        apellido.addEventListener("dblclick", LlenarABM);
        apellido.setAttribute("name", "apellidoTabla");
        apellido.innerText = cliente.getApellido();
        var edad = document.createElement('td');
        edad.addEventListener("dblclick", LlenarABM);
        edad.setAttribute("name", "edadTabla");
        edad.innerText = cliente.getEdad().toString();
        var sexo = document.createElement('td');
        sexo.addEventListener("dblclick", LlenarABM);
        sexo.setAttribute("name", "sexoTabla");
        sexo.innerText = cliente.getSexo().toString();
        tr.appendChild(ID);
        tr.appendChild(nombre);
        tr.appendChild(apellido);
        tr.appendChild(edad);
        tr.appendChild(sexo);
        body.appendChild(tr);
        //validar
        LimpiarABM();
    }
    function LlenarABM(e) {
        var row = e.target.parentNode;
        var id = document.getElementById("txtID");
        var nombre = document.getElementById("txtNombre");
        var apellido = document.getElementById("txtApellido");
        var edad = document.getElementById("txtEdad");
        var sexo = document.getElementById("txtSexo");
        id.value = row.childNodes[0].innerText;
        nombre.value = row.childNodes[1].innerText;
        apellido.value = row.childNodes[2].innerText;
        edad.value = row.childNodes[3].innerText;
        sexo.value = row.childNodes[4].innerText;
    }
    function RearmarTabla(listaPersonas) {
        listaPersonas.forEach(function (x) {
            AgregarALaTabla(x);
        });
    }
    function EliminarPersona() {
        var id = document.getElementById("txtID").value;
        var item = listaPersonas.filter(function (x) { return x.getID().toString() == id; });
        if (item != undefined) {
            var indice = listaPersonas.indexOf(item[0]);
            listaPersonas.splice(indice, 1);
            LimpiarABM();
            LimpiarTabla();
            RearmarTabla(listaPersonas);
            alert("LA PERSONA FUE ELIMINADA CORRECTAMENTE");
        }
        else
            alert("EL ID SELECCIONADO NO EXISTE EN LA LISTA DE PERSONAS");
    }
    function LimpiarABM() {
        document.getElementById("txtNombre").value = "";
        document.getElementById("txtApellido").value = "";
        document.getElementById("txtEdad").value = "";
        document.getElementById("slcSexo").value = "Masculino";
    }
    function GetProximoID() {
        var idMaximo = listaPersonas.reduce(function (id, x) {
            if (x.getID() >= id)
                id = x.getID() + 1;
            return id;
        }, 0);
        return idMaximo;
    }
    function LimpiarTabla() {
        var body = document.getElementById("cuerpo");
        body.innerHTML = "";
    }
    function MostrarCampos() {
        console.log("ENTRO A CAMPOS MSOTRADO");
        var chkID = document.getElementById("chkID");
        var chkNombre = document.getElementById("chkNombre");
        var chkApellido = document.getElementById("chkApellido");
        var chkEdad = document.getElementById("chkEdad");
        var chkSexo = document.getElementById("chkSexo");
        if (chkID.checked) {
            var tablasids = document.getElementsByName("idTabla");
            tablasids.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaIds = document.getElementsByName("idTabla");
            tablaIds.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (chkNombre.checked) {
            console.log("ENTRO A CHK NOMBRE");
            var tablaMarca = document.getElementsByName("nombreTabla");
            tablaMarca.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaMarca = document.getElementsByName("nombreTabla");
            tablaMarca.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (chkApellido.checked) {
            var tablaPrecio = document.getElementsByName("apellidoTabla");
            tablaPrecio.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaPrecio = document.getElementsByName("apellidoTabla");
            tablaPrecio.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (chkEdad.checked) {
            var tablaPrecio = document.getElementsByName("edadTabla");
            tablaPrecio.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaPrecio = document.getElementsByName("edadTabla");
            tablaPrecio.forEach(function (x) {
                x.hidden = true;
            });
        }
        if (chkSexo.checked) {
            var tablaModelo = document.getElementsByName("sexoTabla");
            tablaModelo.forEach(function (x) {
                x.hidden = false;
            });
        }
        else {
            var tablaModelo = document.getElementsByName("sexoTabla");
            tablaModelo.forEach(function (x) {
                x.hidden = true;
            });
        }
    }
    function FiltrarTabla() {
        var slcSexo = document.getElementById("slcFiltro").value;
        var listaFiltrada = listaPersonas;
        LimpiarTabla();
        switch (slcSexo) {
            case "Masculino":
                listaFiltrada = listaFiltrada.filter(function (x) { return x.getSexo().toString() == "Masculino"; });
                break;
            case "Femenino":
                listaFiltrada = listaFiltrada.filter(function (x) { return x.getSexo().toString() == "Femenino"; });
                break;
        }
        RearmarTabla(listaFiltrada);
    }
    function CalcularPromedio() {
        var slcSexo = document.getElementById("slcFiltro").value;
        var listaFiltrada = listaPersonas;
        var txtPromedio = document.getElementById("txtPromedio");
        switch (slcSexo) {
            case "Masculino":
                listaFiltrada = listaFiltrada.filter(function (x) { return x.getSexo().toString() == "Masculino"; });
                break;
            case "Femenino":
                listaFiltrada = listaFiltrada.filter(function (x) { return x.getSexo().toString() == "Femenino"; });
                break;
        }
        PromedioEdades(listaFiltrada).then(function (response) {
            if (response > -1)
                txtPromedio.value = response.toString();
            else
                txtPromedio.value = "0";
        });
    }
    function PromedioEdades(lista) {
        return new Promise(function (resolve, reject) {
            var totalEdades = lista.reduce(function (total, x) {
                return total += x.getEdad();
            }, 0);
            resolve(totalEdades / lista.length);
        });
    }
})(general || (general = {}));
