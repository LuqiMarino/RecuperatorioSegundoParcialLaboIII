namespace general{
    export class Cliente extends Persona{
        private sexo:sexo;
        constructor(id:number, nombre:string, apellido:string, edad:number, sexo:sexo){            
            super(id, nombre, apellido, edad);
            this.sexo = sexo;
        }

        public getSexo():sexo{
            return this.sexo;
        }        
    }

    export enum sexo{
        Masculino = "Masculino",
        Femenino = "Femenino"
    }
    
}