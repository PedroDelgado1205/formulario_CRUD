class Direccion {
    codigo!: string;
    codigoPersona!: string;
    callePrincipal!: string;
    calleSecundaria!: string;
    sector!: string;
    numero!: string;
}

class Telefono {
    codigo!: string;
    codigoPersona!: string;
    numero!: string;
    operadora!: string;
}

class Persona {
    codigo!: string;
    cedula!: string;
    nombre!: string;
    apellido!: string;
    edad!: number;
    nacionalidad!: string;

    telefono!: Telefono;

    direccion!: Direccion;
}
