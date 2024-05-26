const indxDB = indexedDB;
const myForm = document.getElementById("formulario");

const databaseName = "Bventas";

if (indxDB && myForm) {
    let db;
    const solicitud = indxDB.open(databaseName, 1);

    solicitud.onsuccess = () => {
        db = solicitud.result;
        console.log("open", db);
        readData();
    };

    solicitud.onupgradeneeded = () => {
        db = solicitud.result;
        console.log("Create", db);
        const almacen = db.createObjectStore("Unidad", { keyPath: "nombre" });
    };

    solicitud.onerror = (error) => {
        db = solicitud.result;
        console.log("error", error);
    };

    myForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = {
            nombre: e.target.nom.value,
            targeta: e.target.cre.value,
            orden: e.target.hor.value,
            direccion: e.target.info.value
        };
        if (myForm.opc.value === "Guardar") addData(data);
        else upData(data);
    });

    const addData = (data) => {
        const transaccion = db.transaction(["Unidad"], "readwrite");
        const almacen = transaccion.objectStore("Unidad");
        const solicitud = almacen.add(data);
        myForm.reset();
        readData();
    };

    var getData = (clave) => {
        const transaccion = db.transaction(["Unidad"], "readwrite");
        const almacen = transaccion.objectStore("Unidad");
        const solicitud = almacen.get(clave);
        solicitud.onsuccess = (e) => {
            myForm.nom.value = solicitud.result.nombre;
            myForm.cre.value = solicitud.result.targeta;
            myForm.hor.value = solicitud.result.orden;
            myForm.info.value = solicitud.result.direccion; 
            myForm.opc.value = "Actualizar";
        };
    };

    const upData = (data) => {
        const transaccion = db.transaction(["Unidad"], "readwrite");
        const almacen = transaccion.objectStore("Unidad");
        const solicitud = almacen.put(data);
        myForm.reset();
        myForm.opc.value = "Guardar";
        readData();
    };

    const readData = () => {
        document.getElementById("datos").innerHTML = "";
        const transaccion = db.transaction(["Unidad"], "readonly");
        const almacen = transaccion.objectStore("Unidad");
        const solicitud = almacen.openCursor();
        solicitud.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                console.log(cursor.value);
                document.getElementById("datos").innerHTML += `<tr>
                            <td>${cursor.value.nombre}</td>
                            <td>${cursor.value.targeta}</td>
                            <td>${cursor.value.orden}</td>
                            <td>${cursor.value.direccion}</td> <!-- Display "Información Adicional" -->
                            <td>${cursor.key}</td>
                            <td><button onclick="getData('${cursor.key}')" class="btn btn-success">Editar</button></td>
                            <td><button onclick="deleteData('${cursor.key}')" class="btn btn-success danger">Borrar</button></td>
                        </tr>`;
                cursor.continue();
            }
        };
    };
}

function deleteData(e) {
    const solicitud = indxDB.open(databaseName, 1); 
    solicitud.onsuccess = () => {
        let del = solicitud.result;
        let deldata = del.transaction("Unidad", "readwrite");
        let ncliente = deldata.objectStore("Unidad");
        ncliente.delete(e);
        location.reload();
    };
}