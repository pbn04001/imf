IMFApp.factory('DialogFactory',[function(){

    this.alertDialog = null;
    return {
        showAlertDialog: function(message,type) {
            var dialogClass = null;
            var title = null;
            switch(type){
                case 'error':
                    dialogClass = 'alert-danger';
                    title = 'Error!';
                    break;
                case 'warning':
                    title = 'Warning!';
                    dialogClass = 'alert-warning';
                    break;
                default:
                    title = 'Note!'
                    dialogClass = 'alert-info';
            }

            if(this.alertDialog != null){
                this.alertDialog.modal('hide');
            }
            var dialgoId = 'imf-alert-dialog-modal-' + Math.round(Math.random()*1000000);
            var dialog = '<div id="' + dialgoId + '" class="modal alert ' + dialogClass + ' fade-in">' +
                '<a href="#" onclick="$(\'.modal-backdrop\').remove();return false;" class="close" data-dismiss="alert">&times;</a>' +
                '<strong>' + title + '</strong> ' + message + '</div>';
            $('body').append(dialog);

            this.alertDialog = $('#' + dialgoId);
            this.alertDialog.on('show',this.centerDialog(dialgoId));
            this.alertDialog.modal({backdrop : true, show : false, keyboard : false});
            this.alertDialog.modal('show');
        },
        centerDialog: function(dialogId){
            return function() {
                var dialog = $('#' + dialogId);
                dialog.css('display', 'block');
                var offset = ($(window).height() - dialog.height()) / 2,
                    bottomMargin = parseInt(dialog.css('marginBottom'), 10);
                var windowWidth = $(window).width();
                if(windowWidth - 20 < dialog.width()){
                    dialog.css('width',windowWidth - 20);
                }

                // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
                if(offset < bottomMargin) offset = bottomMargin;
                dialog.css("margin-top", offset);
            };
        }

    };

}]);