import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";


/* this is to validate the files that will be uploaded so that they are of a specific type
 in this case I have restricted the filter to only allow jpgs pngs gif and to not allow any mp4 or pdfs for instance
 after learning how to implement the filter functionality and restricting function I have made changes to the code that
 I found from Maximilian Schwarzmüller by editing some of the file types that I would be accepting as he did not have the
 ones that I was looking for https://www.udemy.com/angular-2-and-nodejs-the-practical-guide/
*REFERENCE*
 in order to find out how to write this complex function I recieved the working functionality from Maximilian Schwarzmüller
Which will be referenced in the report
*/
export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  if(typeof(control.value) === 'string') {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          //here are the file types being used, explicitly deciding which will be allowed
          case "89504e47":
            isValid = true;
            break;
          case "47494638":
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false; 
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
