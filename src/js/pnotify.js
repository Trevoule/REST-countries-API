
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/Material.css';
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

function Message(message) {
  info({
    title: "Please provide more specified request ",
    text: `Be more specific currently found ${message}`,
        
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}

export default { Message };
