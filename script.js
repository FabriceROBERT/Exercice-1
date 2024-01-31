var hiddenButton = document.getElementById("hidden");
var container = document.getElementById("container");
var showUp = document
  .getElementById("showUpButton")
  .addEventListener("click", getShowUp);
hiddenButton.addEventListener("click", showButton);

function getShowUp() {
  if (hiddenButton.style.visibility === "collapse") {
    hiddenButton.style.visibility = "visible";
  } else {
    hiddenButton.style.visibility = "collapse";
  }
}
// Obtient la liste des noms, étages et pièces
async function getData() {
  const response = await fetch(
    "https://api-developers.spinalcom.com/api/v1/geographicContext/space"
  );
  const data = await response.json();
  return data;
}
// Affiche le bouton Spatial
async function fetchDataName() {
  const data = await getData();
  if (data) {
    var nameData = document.createElement("span");
    nameData.textContent = "Zone Géographique: " + data.name;
    hiddenButton.appendChild(nameData);
    container.appendChild(hiddenButton);
  }
  return data;
}

// Affiche le bouton Usine
async function showButton() {
  const data = await getData();
  if (data && data.children) {
    data.children.forEach((child) => {
      var buttonChildren = document.createElement("div");
      var buttonChildrenSpan = document.createElement("span");
      buttonChildrenSpan.textContent = "Nom du bâtiment: " + child.name;
      buttonChildren.classList.add("buttonChildrenClass");
      buttonChildren.appendChild(buttonChildrenSpan);
      container.appendChild(buttonChildren);

      // Appelle à la fonction qui affiche la liste des étages et des piéces une fois cliqué
      buttonChildrenSpan.addEventListener("click", () =>
        showChildrenOfChildren(child, buttonChildren, child.dynamicId)
      );
    });
  }
}

async function showChildrenOfChildren(parent, parentButton) {
  if (parent.children) {
    var ulChildren = document.createElement("ul");

    parent.children.forEach((child) => {
      var liChild = document.createElement("li");
      liChild.textContent = "Nom des Etages : " + child.name;
      liChild.classList.add("liChild");
      ulChildren.appendChild(liChild);

      // Traitement des enfants des enfants des enfants, et ainsi de suite
      if (child.children) {
        child.children.forEach((grandChild) => {
          var liGrandChild = document.createElement("li");
          liGrandChild.textContent = "Nom des pièces : " + grandChild.name;
          ulChildren.appendChild(liGrandChild);
          liGrandChild.classList.add("liGrandChild");

          // Ajouter un événement au clic sur liGrandChild
          liGrandChild.addEventListener("click", async () => {
            // Try catch qui recupère la valeur de l'espace
            try {
              const response = await fetch(
                `https://api-developers.spinalcom.com/api/v1/room/${grandChild.dynamicId}/control_endpoint_list`
              );
              const data = await response.json();
              console.log(data[0].endpoints[4].currentValue);
              // Si la data existe et contient un endpoints, plusieurs conditions sont réunies
              if (data && data[0].endpoints) {
                const currentValue = data[0].endpoints[4].currentValue;

                // Basée sur la valeur de currentValue
                if (currentValue === true) {
                  alert(grandChild.name + " : Occupée");
                } else if (currentValue === false) {
                  alert(grandChild.name + " : Non Occupée");
                } else {
                  alert(
                    grandChild.name +
                      " : Erreur de données, Nos services sont actuellement en maintenance pour connaitre l'état d'occupation de la pièce."
                  );
                }
              } else {
                alert(
                  grandChild.name +
                    " : Erreur de données, Nos services sont actuellement en maintenance pour connaitre l'état d'occupation de la pièce"
                );
              }
            } catch (error) {
              alert(
                grandChild.name +
                  " : Erreur de données, Nos services sont actuellement en maintenance pour connaitre l'état d'occupation de la pièce"
              );
              console.error(
                "Impossible d'obtenir les informations sur cette pièce actuellement",
                error
              );
              ("Nom des pièces : Erreur de récupération");
            }
          });
        });
      }
    });

    parentButton.appendChild(ulChildren);
  }
}

fetchDataName();
getData();
