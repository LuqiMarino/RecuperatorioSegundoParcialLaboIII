namespace general{
    window.addEventListener("load", function(){
        (<HTMLInputElement>document.getElementById("btnLimpiar")).addEventListener("click", LimpiarTabla);
        (<HTMLInputElement>document.getElementById("btnAgregar")).addEventListener("click", AgregarPersona);
        (<HTMLInputElement>document.getElementById("btnEliminar")).addEventListener("click", EliminarPersona);
        (<HTMLInputElement>document.getElementById("btnCalcularPromedio")).addEventListener("click", CalcularPromedio);
        (<HTMLInputElement>document.getElementById("slcFiltro")).addEventListener("change", FiltrarTabla);

        (<HTMLInputElement>document.getElementById("chkID")).addEventListener("change", MostrarCampos);
        (<HTMLInputElement>document.getElementById("chkNombre")).addEventListener("change", MostrarCampos);
        (<HTMLInputElement>document.getElementById("chkApellido")).addEventListener("change", MostrarCampos);
        (<HTMLInputElement>document.getElementById("chkEdad")).addEventListener("change", MostrarCampos);     
        (<HTMLInputElement>document.getElementById("chkSexo")).addEventListener("change", MostrarCampos);        
    });

    var listaPersonas:Array<Persona> = new Array<Persona>();

    function AgregarPersona():void{
        var nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        var apellido:string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
        var edad:number = parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value);
        
        var id:number = -1;
        GetProximoID().then((response)=>{
            id = response;
        });

        var cliente:Cliente = new Cliente(id, nombre, apellido, edad, sexo.Masculino);
        var slcSexo:string = (<HTMLInputElement>document.getElementById("slcSexo")).value;

        if (slcSexo == "Femenino")
            cliente = new Cliente(id, nombre, apellido, edad, sexo.Femenino);

        if (CheckInputs()){
            listaPersonas.push(cliente);        
            AgregarALaTabla(cliente);
            alert("PERSONA AGREGADA CORRECTAMENTE");
        }
        else{
            alert("FALTAN CAMPOS POR COMPLETAR");
        }        
    }

    function CheckInputs():boolean{
        var nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        var apellido:string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
        var edad:string = (<HTMLInputElement>document.getElementById("txtEdad")).value;
        var slcSexo:string = (<HTMLInputElement>document.getElementById("slcSexo")).value;

        if (nombre != "" && apellido != "" && edad != "" && slcSexo != "")
            return true;
        return false;
    }

    function AgregarALaTabla(cliente:Cliente):void{
        var body = document.getElementById("cuerpo");
        var tr=document.createElement('tr');

        var ID=document.createElement('td');
        ID.addEventListener("dblclick", LlenarABM);
        ID.setAttribute("name","idTabla");
        ID.innerText=cliente.getID().toString();

        var nombre=document.createElement('td');
        nombre.addEventListener("dblclick", LlenarABM);
        nombre.setAttribute("name","nombreTabla");
        nombre.innerText=cliente.getNombre();

        var apellido=document.createElement('td');
        apellido.addEventListener("dblclick", LlenarABM);
        apellido.setAttribute("name","apellidoTabla");
        apellido.innerText=cliente.getApellido();

        var edad=document.createElement('td');
        edad.addEventListener("dblclick", LlenarABM);
        edad.setAttribute("name","edadTabla");
        edad.innerText=cliente.getEdad().toString();

        var sexo=document.createElement('td');
        sexo.addEventListener("dblclick", LlenarABM);
        sexo.setAttribute("name","sexoTabla");
        sexo.innerText=cliente.getSexo().toString();

        tr.appendChild(ID);
        tr.appendChild(nombre);
        tr.appendChild(apellido);
        tr.appendChild(edad);
        tr.appendChild(sexo);
        body.appendChild(tr);

        //validar

        LimpiarABM();
    }

    function LlenarABM(e):void{
        var row = e.target.parentNode;

        var id = <HTMLInputElement>document.getElementById("txtID");
        var nombre = <HTMLInputElement>document.getElementById("txtNombre");
        var apellido = <HTMLInputElement>document.getElementById("txtApellido");
        var edad = <HTMLInputElement>document.getElementById("txtEdad");
        var sexo = <HTMLInputElement>document.getElementById("txtSexo");        
        
        id.value = row.childNodes[0].innerText;
        nombre.value = row.childNodes[1].innerText;
        apellido.value = row.childNodes[2].innerText;
        edad.value = row.childNodes[3].innerText;
        sexo.value = row.childNodes[4].innerText;        
    }

    function RearmarTabla(listaPersonas:Array<Persona>):void{
        listaPersonas.forEach(x => {
            AgregarALaTabla(x as Cliente);
        })
    }

    function EliminarPersona():void{
        var id = (<HTMLInputElement>document.getElementById("txtID")).value;
        var item = listaPersonas.filter(x => x.getID().toString() == id);
        if (item != undefined){
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

    function LimpiarABM():void{
        (<HTMLInputElement>document.getElementById("txtNombre")).value = "";
        (<HTMLInputElement>document.getElementById("txtApellido")).value = "";
        (<HTMLInputElement>document.getElementById("txtEdad")).value = "";
        (<HTMLInputElement>document.getElementById("slcSexo")).value = "Masculino";
    }

    function GetProximoID():Promise<number>{
        return new Promise((resolve,reject)=>{
            var totalEdades = listaPersonas.reduce(function(id, x){
                if (x.getID() >= id)
                    id = x.getID() + 1;
                return id;
            }, 0);
            resolve(totalEdades / listaPersonas.length);
          });
    }

    function LimpiarTabla():void{
        var body = document.getElementById("cuerpo");
        body.innerHTML = "";
    }

    function MostrarCampos():void{
        console.log("ENTRO A CAMPOS MSOTRADO");
        var chkID = <HTMLInputElement>document.getElementById("chkID");
        var chkNombre = <HTMLInputElement>document.getElementById("chkNombre");
        var chkApellido = <HTMLInputElement>document.getElementById("chkApellido");
        var chkEdad = <HTMLInputElement>document.getElementById("chkEdad");
        var chkSexo = <HTMLInputElement>document.getElementById("chkSexo");

        if(chkID.checked){
            var tablasids = document.getElementsByName("idTabla");
            tablasids.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaIds = document.getElementsByName("idTabla");
            tablaIds.forEach(x=> {
                x.hidden = true;
            });
        }
        if(chkNombre.checked){
            console.log("ENTRO A CHK NOMBRE");
            var tablaMarca = document.getElementsByName("nombreTabla");
            tablaMarca.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaMarca = document.getElementsByName("nombreTabla");
            tablaMarca.forEach(x=> {
                x.hidden = true;
            });
        }
        if(chkApellido.checked){
            var tablaPrecio = document.getElementsByName("apellidoTabla");
            tablaPrecio.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaPrecio = document.getElementsByName("apellidoTabla");
            tablaPrecio.forEach(x=> {
                x.hidden = true;
            });
        }
        if(chkEdad.checked){
            var tablaPrecio = document.getElementsByName("edadTabla");
            tablaPrecio.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaPrecio = document.getElementsByName("edadTabla");
            tablaPrecio.forEach(x=> {
                x.hidden = true;
            });
        }
        if(chkSexo.checked){
            var tablaModelo = document.getElementsByName("sexoTabla");
            tablaModelo.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaModelo = document.getElementsByName("sexoTabla");
            tablaModelo.forEach(x=> {
                x.hidden = true;
            });
        }
    }

    function FiltrarTabla():void{
        var slcSexo = (<HTMLInputElement>document.getElementById("slcFiltro")).value;
        var listaFiltrada:Array<Cliente> = listaPersonas as Array<Cliente>;
        LimpiarTabla();
        switch(slcSexo){
            case "Masculino":
                listaFiltrada = listaFiltrada.filter(x => x.getSexo().toString() == "Masculino");
                break;
            case "Femenino":
                listaFiltrada = listaFiltrada.filter(x => x.getSexo().toString() == "Femenino");
                break;
        }
        RearmarTabla(listaFiltrada);
    }

    function CalcularPromedio():void{
        var slcSexo = (<HTMLInputElement>document.getElementById("slcFiltro")).value;
        var listaFiltrada:Array<Cliente> = listaPersonas as Array<Cliente>;
        var txtPromedio = <HTMLInputElement>document.getElementById("txtPromedio");

        switch(slcSexo){
            case "Masculino":
                listaFiltrada = listaFiltrada.filter(x => x.getSexo().toString() == "Masculino");
                break;
            case "Femenino":
                listaFiltrada = listaFiltrada.filter(x => x.getSexo().toString() == "Femenino");
                break;
        }

        PromedioEdades(listaFiltrada).then((response)=>{
            if (response > -1)
                txtPromedio.value = response.toString();
            else
                txtPromedio.value = "0";
          });
    }

    function PromedioEdades(lista:Array<Cliente>):Promise<number>{
        return new Promise((resolve,reject)=>{
            var totalEdades = lista.reduce(function(total, x){
              return total += x.getEdad();
            }, 0);
            resolve(totalEdades / lista.length);
          });
    }
}