import * as core from './core.js';


// A $( document ).ready() block.
$(document).ready(function() {
    showTareas();

    // Nueva Tarea Img
    $('.sin-tareas').click(function() {
            toggleModal();

        })
        // REMOVER VALIDACION
    $('.ml-input,.ml-textarea').on('keyup', function() {
            let val = $(this).val();
            if (val != "") {
                if ($(this).is('input'))
                    $(this).removeClass("invalid-input");
                else if ($(this).is('textarea'))
                    $(this).removeClass("invalid-textarea");
            }

        })
        // GUARDAR O MODIFICAR TAREA
    $('#btnModalSave').click(function(e) {
            debugger
            let tarea = core.tarea;
            tarea.Titulo = $('#Titulo').val();
            tarea.Descripcion = $('#Descripcion').val();
            tarea.IsComplete = $('#Estado').val();
            tarea.IdTarea = $('#IdTarea').val();
            if (validarDatosModal())
                if (tarea.IdTarea > 0)
                    updateTarea(tarea)
                else
                    insertTarea(tarea);
            else
                alert("todo mal");
        })
        // EDITAR TAREA
    $('#btnEdit').click(function() {
            debugger
            let tareaHtml = $('.task-selected')[0];
            let id = $(tareaHtml).data('id');
            let tareas = core.getTareas();
            let tarea = tareas[id - 1];
            setDatosModal(tarea);
            toggleModal();
        })
        // Marcar Tareas como Completadas 
    $('#btnComplete').click(function() {
            let tareas = $('.task-selected');
            $.each(tareas, function(key, val) {
                let id = $(this).data("id");
                $('.task-icon', this).addClass('task-completed')
                $(this).removeClass('task-selected');
                updateEstadoTarea(id, true);
            })
        })
        // Marcar Tareas como Pendientes 
    $('#btnPending').click(function() {
            let tareas = $('.task-selected');
            $.each(tareas, function(key, val) {
                let id = $(this).data("id");
                $('.task-icon', this).removeClass('task-completed')
                $(this).removeClass('task-selected');
                updateEstadoTarea(id, false);
            })
        })
        // Eliminar Tareas
    $('#btnDelete').click(function() {
        let tareas = $('.task-selected');
        $.each(tareas, function(key, val) {
            let id = $(this).data("id");
            deleteTarea(id);
        })
    })


});

function insertTarea(tarea) {
    core.setTarea(tarea);
    showTareas();
    toggleModal();
}

function updateTarea(tarea) {
    let tareas = core.getTareas();
    tareas[index - 1].IsComplete = tarea;
    core.refreshTareas(tareas);
    showTareas();
    toggleModal();
}

function updateEstadoTarea(index, estado) {
    let tareas = core.getTareas();
    tareas[index - 1].IsComplete = estado;
    unselectTask(index);
    core.refreshTareas(tareas);
}

function deleteTarea(index) {
    let tareas = core.getTareas();
    tareas.pop(index - 1);
    core.refreshTareas(tareas);
    unselectTask(index);
    showTareas();
}


function unselectTask(index) {
    $(`#chk-task-${index}`).prop('checked', false);
    $('#btnEdit').removeAttr("disabled").addClass("btn-edit-hover");
}

function toggleModal() {
    $('#ModalComponent').modal('toggle');
    $('#Titulo').val('');
    $('#Descripcion').val('');
    $('#Estado').val('false');
}

async function showTareas() {
    await $('.task-list').empty();
    let tareas = core.getTareas();
    if (tareas.length > 0) {
        $('.sin-tareas').css("display", "none");
        for (let tarea of tareas) {
            await appendTarea(tarea);
        }
    } else
        $('.sin-tareas').css("display", "block");
    // CONTAR TAREAS SELECCIONADAS
    $('input[type=checkbox]').on('click', function() {
        let selected = $('input[type=checkbox]:checked').length;
        if (selected > 1 || selected == 0) {
            $('#btnEdit').attr("disabled", "disabled").removeClass("btn-edit-hover");
        } else
            $('#btnEdit').removeAttr("disabled").addClass("btn-edit-hover");
        if ($(this).prop('checked'))
            $(this).parents('.task').addClass('task-selected');
        else
            $(this).parents('.task').removeClass("task-selected", 1000, "swing");
    })
    let iconos = $('.task-icon');
    $.each(iconos, function(key, val) {
        debugger
        $(this).on("click", function() {
            alert("hola");
            // debugger
            // let id = $(val).parents(".task").data("id");
            // let isComplete = $(val).hasAttr('.task-completed');
            // if (isComplete)
            //     updateEstadoTarea(id, !isComplete);
            // else
            //     updateEstadoTarea(id, isComplete)
        })
    })
}

function appendTarea(tarea) {
    $('.task-list').append(
        `
        <li class="task" data-id="${tarea.IdTarea}">
            <label class="checkbox-label" >
                <input type="checkbox" id="chk-task-${tarea.IdTarea}" />
                <span class="checkbox-custom"></span>
            </label>
            <p class="task-title">${tarea.Titulo}</p>
            <i class="far fa-check-circle task-icon fa-2x ${tarea.IsComplete? "task-completed":""}"></i>
        </li>
        `
    )
}

function validarDatosModal() {
    let resp = true;
    let camposvalidar = $('#ModalComponent .requerido');
    $.each(camposvalidar, function(key, input) {
        let val = $(input).val();
        if (!val || val == "") {
            resp = false;
            if ($(this).is('input'))
                $(input).addClass("invalid-input");
            else if ($(this).is('textarea'))
                $(input).addClass("invalid-textarea");
            else if ($(this).is('select'))
                $(input).addClass("invalid-select");
        }
    })
    return resp
}

function limpiarDatosModal() {

}

function setDatosModal(tarea) {
    $('#IdTarea').val(tarea.IdTarea)
    $('#Titulo').val(tarea.Titulo);
    $('#Descripcion').val(tarea.Descripcion);
    $('#Estado').val(`${tarea.IsComplete}`);
}