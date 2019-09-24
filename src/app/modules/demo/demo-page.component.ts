import {
  AXBasePageComponent,
  PromisResult,
  AXHttpService,
  CheckItem,
  AXToastService,
  DialogService,
  AXPopupService,
  MenuItem,
  SelectItem
} from "acorex-ui";
import { Component } from "@angular/core";
import { AliPage } from "./ali/ali.page";

@Component({
  templateUrl: "./demo-page.component.html"
})
export class DemoPage extends AXBasePageComponent {
  constructor(
    private http: AXHttpService,
    private toast: AXToastService,
    private dialog: DialogService,
    private popup: AXPopupService
  ) {
    super();
  }
  htmlContent = `
  <div>
  <p><span style="color:#000000">Hi Craig,</span></p>
  <p><span style="color:#000000">Please find attached invoice in regards to Job #4469CQ.</span></p>
  <p>&nbsp;</p>
  <p><span style="color:#000000"><strong>Total amount: $4,397.80</strong></span></p>
  <p><span style="color:#000000">Please send us the proof of the payment by replying to this email.</span></p>
  <p><span style="color:#000000"><strong>Bank Account Details:</strong></span></p>
  <p><span style="color:#000000"><strong>Account Name: CQ Flooring</strong></span></p>
  <p><span style="color:#000000"><strong>BSB: 063074</strong></span></p>
  <p><span style="color:#000000"><strong>ACC No. : 10060205</strong></span></p>
  <p>&nbsp;</p>
  <p><span style="color:#000000">We appreciate your prompt payment.</span></p>
  <!--[if mso]>				</td>				<![endif]-->
  <!--[if mso]>				</tr>				</table>				<![endif]-->
  <!--[if (gte mso 9)</td><td align="left" >(IE)]>                        </td>                        </tr>                        </table>                        <![endif]-->
  <!-- // END TEMPLATE --><br><span><br><br></span>
  <div dir="ltr" style="margin-left:0pt;"><br><br>
      <table style="border:none;border-collapse:collapse;">
          <colgroup>
              <col width="210">
              <col width="382">
          </colgroup>
          <tbody>
              <tr style="height:137.25pt;">
                  <td
                      style="border-right:solid #538135 .9960975000000001pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;">
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><span
                              style="font-size:8pt;font-family:Arial;color:rgb(34,34,34);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">
                              &nbsp;&nbsp;&nbsp;</span></p>&nbsp; &nbsp; &nbsp; <img border="0"
                          src="https://no-cookies-cdn.servicem8.com/VendorLogo_ShowLogo?uuid=ac31c109-71ef-4462-878f-b08dc282e17b&amp;boolEmailSignature=1">
                  </td>
                  <td
                      style="border-left:solid #538135 .9960975000000001pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;">
                      <br>
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><span
                              style="font-size:10pt;font-family:Arial;color:rgb(176,162,134);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap;">Regards,</span>
                      </p>
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><span
                              style="font-size:10pt;font-family:Arial;color:rgb(176,162,134);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap;">Tara
                          </span></p>
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><span
                              style="font-size:10pt;font-family:Arial;color:rgb(205,196,178);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap;">Accounts
                          </span><span
                              style="background-color:transparent;color:rgb(205,196,178);font-family:Arial;font-size:10pt;font-weight:700;white-space:pre-wrap;">Manager</span>
                      </p>
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><span
                              style="font-size:7.5pt;font-family:Arial;color:rgb(106,168,79);background-color:transparent;font-weight:700;vertical-align:baseline;white-space:pre-wrap;">Tel</span><span
                              style="font-size:7.5pt;font-family:Arial;color:rgb(106,168,79);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">:</span><span
                              style="font-size:7.5pt;font-family:Arial;color:rgb(153,153,153);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">
                          </span><span
                              style="font-size:7.5pt;font-family:Arial;color:rgb(17,85,204);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">1300
                              040 444</span><span
                              style="font-size:7.5pt;font-family:Arial;color:rgb(102,102,102);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">
                          </span></p>
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><a
                              href="http://cqflooring.com.au/"><span
                                  style="font-size:10pt;font-family:Arial;color:rgb(17,85,204);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">http://cqflooring.com.au/</span></a>
                      </p>
                      <p dir="ltr" style="line-height:1.656;margin-top:0pt;margin-bottom:0pt;"><span
                              style="font-size:8pt;font-family:Arial;color:rgb(153,153,153);background-color:transparent;vertical-align:baseline;white-space:pre-wrap;">5/216
                              Blackshaws Road Altona North VIC 3025</span></p><br>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  <div></div><img src="https://go.servicem8.com/rr---?/07bc6323-d04c-4570-88d2-ba0c036498bb/spacer.gif"
      style="border: 0; width: 0px; height: 0px;" width="0" height="0">
</div>
  `;
  drawerOpen: boolean = false;
  //TODO : data structure select box
  selectBoxItems: SelectItem[] = [
    { id: "1", text: "Select Option 1" },
    { id: "2", text: "Select Option 2" },
    { id: "3", text: "Select Option 3" },
    { id: "4", text: "Select Option 4" },
    { id: "5", text: "Select Option 5" }
  ];
  sectionList: CheckItem[] = [
    {
      text: "First",
      selected: false
    },
    {
      text: "Second",
      selected: false
    },
    {
      text: "Third",
      selected: false
    },
    {
      text: "Fourth",
      selected: false
    },
    {
      text: "Fifth",
      selected: false
    }
  ];

  provideGridData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/todos", {})
        .result(c => {
          resolve(c);
          console.log(c);
        });
    });
  };
  provideListData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/users", {})
        .result(c => {
          resolve((<any>c).slice(0, 8));
          console.log(c);
        });
    });
  };
  warningToast() {
    this.toast.warning("This is warning message", {
      timeOut: 2000,
      title: "Warning",
      closeable: true
    });
  }
  successToast() {
    this.toast.success("This is success message", {
      timeOut: 2000,
      title: "Success",
      closeable: true
    });
  }
  errorToast() {
    this.toast.error("This is error message", {
      timeOut: 2000,
      title: "Error",
      closeable: true
    });
  }
  infoToast() {
    this.toast.info("This is info message", {
      timeOut: 2000,
      title: "Info",
      closeable: true
    });
  }
  openPopup() {
    this.popup.open(DemoPage, {
      title: "Title Popup Here",
      size: "lg"
    });
  }
  openDrawer() {
    this.drawerOpen = true;
  }
  openAlert() {
    this.dialog.alert("Alert", "This is alert message");
  }
  openAlertConfirm() {
    this.dialog.confirm("Confirm", "Confirm message can be here").okay(() => {
      alert("you clicked confirm");
    });
  }

  toolbarItems: MenuItem[] = [
    {
      id: "1",
      name: "edit",
      text: "Item",
      icon: "fas fa-save",
      style: "ax-success",
      items: [
        {
          parentId: "1",
          name: "edit",
          text: "Sub 1",
          id: "1_1",
          items: [
            {
              parentId: "1",
              name: "edit",
              text: "Sub 2",
              id: "1_2"
            },
            {
              parentId: "1_2",
              name: "add",
              text: "Sub Sub 1",
              visible: false
            }
          ]
        }
      ]
    },
    {
      id: "1",
      name: "item",
      text: "Item 2",
      icon: "fas fa-pen",
      style: "ax-primary"
    },
    {
      id: "1",
      name: "item",
      text: "Item 3",
      icon: "fas fa-pen",
      style: "ax-warning"
    },
    {
      id: "1",
      name: "item",
      text: "Item 4",
      icon: "fas fa-pen",
      style: "ax-danger"
    },
    {
      id: "1",
      name: "item",
      text: "Item 5",
      icon: "fas fa-pen",
      style: "ax-info"
    },
    {
      id: "1",
      name: "item",
      text: "Item 6",
      icon: "fas fa-pen",
      style: "ax-secondary"
    }
  ];
}
