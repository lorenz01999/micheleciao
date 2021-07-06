export function validate (form) {
   if(/^[a-zA-Z]{2,}([ ][a-zA-Z]{3,})*$/.test(form.name)) {
      if(/^[a-zA-Z]{2,}([ ][a-zA-Z]{3,})*$/.test(form.surname)) {
         if(/^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i.test(form.fiscalCode)) {
            if(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(form.birthDate)) {
               if(/^[a-zA-Z]{2,}([ ][a-zA-Z]{3,})*$/.test(form.birthPlace)) {
                  if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,2}$/.test(form.email)) {
                     if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) {
                        return true;
                     }
                     else return {errorMessage: "La password deve contenere un minimo di 8 caratteri di cui almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale", isVisible: true};
                  }
                  else return {errorMessage: "Inserisci una email valida", isVisible: true};
               }
               else return {errorMessage: "Il PIN deve essere composto da 4 cifre", isVisible: true};
            } 
            else return {errorMessage: "Inserisci la data di nascita", isVisible: true};
         }
         else return {errorMessage: "Inserisci un codice fiscale valido", isVisible: true};
      }
      else return {errorMessage: "Il cognome deve contenere solo caratteri (almeno 2)", isVisible: true}; 
   }
   else return {errorMessage: "Il nome deve contenere solo caratteri (almeno 2)", isVisible: true};
}

export function validate2(form) {
   if(/^[a-zA-Z0-9]{10}$/.test(form.licenseNumber)) {
      if(/^[mM][cC]-[a-zA-Z]{2}$/.test(form.releasedFrom)) {
         if(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(form.releaseDate)) {
            if(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(form.expirationDate)) {
               if(form.A1 || form.A2 || form.A3 || form.B) {
                  return true;
               }
               else return {errorMessage: "Seleziona almeno una patente", isVisible: true};
            }
            else return {errorMessage: "Inserisci la data di scadenza", isVisible: true};
         }
         else return {errorMessage: "Inserisci la data di rilascio", isVisible: true};
      }
      else return {errorMessage: "Inserisci l'ente di rilascio", isVisible: true};
   }
   else return {errorMessage: "Inserisci un numero di patente valido", isVisible: true};
}
export function validate3(form) {
   if(form.brand) {
      if(form.model) {
         if(form.serialNumber) {
               if(form.mainImage) {
                  if (form.photos) {
                     if (form.type) {
                        switch (form.type) {
                           case "0":
                              if (form.licensePlate) {
                                 if(form.displacement) {
                                    if(form.kilowatt) {
                                       if(form.seats) {
                                          if(form.category) {
                                             if(form.consumption) {
                                                if(form.trunkSize) {
                                                   if(form.shift) {
                                                      if(form.euro) {
                                                         if(form.fuel) {
                                                            return true;
                                                         }
                                                         else return {errorMessage: "Inserisci fuel", isVisible: true};
                                                      }
                                                      else return {errorMessage: "Inserisci euro", isVisible: true};
                                                   }
                                                   else return {errorMessage: "Inserisci shift", isVisible: true};
                                                }
                                                else return {errorMessage: "Inserisci dimensione bagagliaio (trunk size)", isVisible: true};
                                             }
                                             else return {errorMessage: "Inserisci consumo gas Car", isVisible: true};
                                          }
                                          else return {errorMessage: "Inserisci categoria", isVisible: true};
                                       }
                                       else return {errorMessage: "Inserisci posti a sedere", isVisible: true};
                                    }
                                    else return {errorMessage: "Inserisci kilowatt", isVisible: true};
                                 }
                                 else return {errorMessage: "Inserisci cilindrata", isVisible: true};
                              }
                              else return {errorMessage: "Inserisci targa", isVisible: true};
                              break;
                           case "1":
                              if (form.licensePlate) {
                                    if(form.kilowatt) {
                                       if(form.seats) {
                                          if(form.category) {
                                             if(form.consumption) {
                                                if(form.trunkSize) {
                                                      if(form.batteryCapacity) {
                                                         if(form.chargeDuration) {
                                                            return true;
                                                         }
                                                         else return {errorMessage: "Inserisci durata batteria", isVisible: true};
                                                      }
                                                      else return {errorMessage: "Inserisci capacità batteria", isVisible: true};
                                                }
                                                else return {errorMessage: "Inserisci dimensione bagagliaio (trunk size)", isVisible: true};
                                             }
                                             else return {errorMessage: "Inserisci consumo gas Car", isVisible: true};
                                          }
                                          else return {errorMessage: "Inserisci categoria", isVisible: true};
                                       }
                                       else return {errorMessage: "Inserisci posti a sedere", isVisible: true};
                                    }
                                    else return {errorMessage: "Inserisci kilowatt", isVisible: true};
                              }
                              else return {errorMessage: "Inserisci targa", isVisible: true};
                              break;
                           case "2":
                              if (form.licensePlate) {
                                 if(form.displacement) {
                                    if(form.kilowatt) {
                                       if(form.category) {
                                             if(form.consumption) {
                                                   if(form.shift) {
                                                      if(form.euro) {
                                                         if(form.fuel) {
                                                            return true;
                                                         }
                                                         else return {errorMessage: "Inserisci fuel", isVisible: true};
                                                      }
                                                      else return {errorMessage: "Inserisci euro", isVisible: true};
                                                   }
                                                   else return {errorMessage: "Inserisci shift", isVisible: true};
                                             }
                                             else return {errorMessage: "Inserisci consumo gas Car", isVisible: true};
                                          }
                                          else return {errorMessage: "Inserisci categoria", isVisible: true};
                                    }
                                    else return {errorMessage: "Inserisci kilowatt", isVisible: true};
                                 }
                                 else return {errorMessage: "Inserisci cilindrata", isVisible: true};
                              }
                              else return {errorMessage: "Inserisci targa", isVisible: true};
                              break;
                           case "3":
                              if (form.licensePlate) {
                                 if(form.kilowatt) {
                                    if(form.category) {
                                          if(form.consumption) {
                                                if(form.batteryCapacity) {
                                                   if(form.chargeDuration) {
                                                      return true;
                                                   }
                                                   else return {errorMessage: "Inserisci durata batteria", isVisible: true};
                                                }
                                                else return {errorMessage: "Inserisci capacità batteria", isVisible: true};
                                          }
                                          else return {errorMessage: "Inserisci consumo gas Car", isVisible: true};
                                       }
                                       else return {errorMessage: "Inserisci categoria", isVisible: true};
                                 }
                                 else return {errorMessage: "Inserisci kilowatt", isVisible: true};
                              }
                              else return {errorMessage: "Inserisci targa", isVisible: true};
                              break;
                           case "4":
                           case "5":
                              if(form.batteryCapacity) {
                                 if(form.chargeDuration) {
                                    return true;
                              }
                                 else return {errorMessage: "Inserisci durata batteria", isVisible: true};
                              }
                              else return {errorMessage: "Inserisci capacità batteria", isVisible: true};
                              break;
                           default:
                              break;
                        }

                     }
                     else return {errorMessage: "Inserisci tipo", isVisible: true};

                  }
                  else return {errorMessage: "Inserisci foto secondarie", isVisible: true};
               }
               else return {errorMessage: "Inserisci foto principale", isVisible: true};
         }
         else return {errorMessage: "Inserisci serialNumber", isVisible: true};
      }
      else return {errorMessage: "Inserisci Modello", isVisible: true};
   }
   else return {errorMessage: "Inserisci brand", isVisible: true};
}