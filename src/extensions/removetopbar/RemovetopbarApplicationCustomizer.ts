//import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { spfi, SPFx } from "@pnp/sp";
//import { AadHttpClient } from '@microsoft/sp-http';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/security";
import "@pnp/sp/site-groups";

//import { Dialog } from '@microsoft/sp-dialog';

//import * as strings from 'RemovetopbarApplicationCustomizerStrings';

//const LOG_SOURCE: string = 'RemovetopbarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IRemovetopbarApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class RemovetopbarApplicationCustomizer
  extends BaseApplicationCustomizer<IRemovetopbarApplicationCustomizerProperties> {

  public async onInit(): Promise<void> {
    const sp = spfi().using(SPFx(this.context));
    //await this.checkAndHideSuiteNav();
    document.head.appendChild(document.createElement("style")).innerHTML = "#sp-appBar{display: none!important;}";
    const currentUser = await sp.web.currentUser();
    const visitorsGroup = (await sp.web.associatedVisitorGroup());
    const users = await sp.web.siteGroups.getById(Number(visitorsGroup.Id)).users();
  
  // Check if the current user is in the Visitors group
  const isVisitor = users.some(user => user.Id === currentUser.Id);
  if (isVisitor) {
    const style = document.createElement("style");
    style.innerHTML = "#SuiteNavWrapper { display: none !important; }";
    document.head.appendChild(style);
  }
      
    //}
    try{
    document.head.appendChild(document.createElement("style")).innerHTML = "#suiteBarTop{display: none!important;}";
    }
    catch(e){
      console.log(e);
    }
  var targetNode = document.querySelector("#parentContainer"); // Ensure this selector matches your parent element

  if (targetNode) {
    var observer1 = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          console.log(mutation);
      });
  });
  
  var config = {
      childList: true, // To observe added/removed child elements
      subtree: true,   // To observe changes in the entire subtree of the target node
  };
  
  observer1.observe(targetNode, config);
  }
    //document.head.appendChild(document.createElement("style")).innerHTML = "#SuiteNavWrapper{display: none!important;}";
   // document.addEventListener('DOMContentLoaded', function() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach((mutation)=> {
          const elements = document.querySelectorAll('.ms-Button-label.ms-ButtonShim-label');
          console.log('Number of elements found:', elements.length);
          if (elements.length > 0) {
            elements.forEach(function(element) {
              console.log('Element text:', element.textContent);
              if (element.textContent && element.textContent.trim() === 'Go to Connections') {
                  // Hide the parent <div> containing the element
                  var parentDiv = element.closest('div');
                  console.log('Parent div:', parentDiv);
                  if (parentDiv) {
                      parentDiv.style.display = 'none';
                      console.log('Parent div hidden');
                  }
              }
          });
              observer.disconnect(); // Stop observing once elements are found
              // Your logic here
          }
      });
  });
  observer.observe(document.body, { childList: true, subtree: true });
 
  return Promise.resolve();

}
  }

