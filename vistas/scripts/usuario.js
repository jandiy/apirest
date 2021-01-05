var tabla;

//Función que se ejecuta al inicio
function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);	
	})
}

function cancelarform()
{
	limpiar();
	mostrarform(false);
}

function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

function limpiar()
{
	//$("#id").val("");
	$("#name").val("");
	$("#job").val("");
}

function guardaryeditar(e)
{
	e.preventDefault(); //No se activará la acción predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);
    var valor = $('#name').val() ;
    var valor2 = $('#job').val() ;
    console.log(valor);
	$.ajax({
		url: "https://reqres.in/api/users",
        type: "POST",
        "method": "POST",
        "header": [],
        "body": {
            "mode": "raw",
            "raw": "{\r\n    \"name\": "+valor+" ,\r\n    \"job\": "+valor2+"\r\n}",
            "options": {
                "raw": {
                    "language": "json"
                }
            }
        },
        //data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {     console.log(datos);              
	          bootbox.alert("ID" + datos.id + " Creado Exitosamente");	          
	          mostrarform(false);
	         // tabla.ajax.reload();
	    }

	});
//	limpiar();
}

function listar()
{
	/*tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//Paginación y filtrado realizados por el servidor
	    /*dom: 'Bfrtip',//Definimos los elementos del control de tabla
	    buttons: [		          
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
		"ajax":
				{
					url: 'https://reqres.in/api/users',
					type : "get",
                    dataType : "json",
                    						
					error: function(e){
						console.log(e.responseText);	
					}
				},
		"bDestroy": true,
		"iDisplayLength": 5,//Paginación
	    "order": [[ 0, "desc" ]]//Ordenar (columna,orden)
    }).DataTable();*/
    $.ajax({
        type: "GET",
        url: "https://reqres.in/api/users?page=2",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#tbllistado > tbody').empty();
            $.each(data, function (i, item) {
            /*var rows = 
            "" +
            "" + item.id + "" +
            "" + item.email + "" +
            "" + item.first_name + "" +
            "" + item.last_name + "" +
            "";
            $('#tbllistado > tbody').append(rows);*/
            console.log([item.page]);
            });
            console.log(data);
            
           },
           failure: function (data) {
            alert(data.responseText);
           },
           error: function (data) {
            alert(data.responseText);
           }
    });
          

    
}

init();