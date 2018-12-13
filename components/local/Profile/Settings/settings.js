const profileSettingsInit = () => {
  document.querySelector("#profile_contents_body").innerHTML = "";
  selectedProfileSettingsTabName = undefined;
  constructProfileSettingsStructure();
  constructProfileSettingsComponentObjectArray();
  constructProfileSettingsTabs(profileSettingsComponentObjectArray);
};

// Create the structure for profile settings
const constructProfileSettingsStructure = () => {
  // HTML
  const profileSettingsStructureHTML =
    "<div id='profile_settings_body'>" +
    "<div id='profile_settings_tabs_body'></div>" +
    "<div id='profile_settings_components_body'></div>" +
    "</div>";
  // Insert HTML
  document.querySelector(
    "#profile_contents_body"
  ).innerHTML = profileSettingsStructureHTML;
};

// Class object for profile settings components
class profilSettingsComponentObject {
  constructor(id, name, method) {
    this.id = id;
    this.name = name;
    this.method = method;
  }
}

// Construct the profile: settings array of component objects
let profileSettingsComponentObjectArray;

const constructProfileSettingsComponentObjectArray = () => {
  constructProfileSettingsProfileObject();

  profileSettingsComponentObjectArray = [profileSettingsProfileObject];
};

// Construct the profile: settings tabs
const constructProfileSettingsTabs = objArr => {
  objArr.forEach(obj => {
    const profileSettingsTabHTML =
      "<div id='" +
      obj.id +
      "_tab_body' class='profile_settings_tab_body'>" +
      "<div id='" +
      obj.id +
      "_tab_text' class='profile_settings_tab_text'>" +
      obj.name +
      "</div>" +
      "</div>";

    document
      .querySelector("#profile_settings_tabs_body")
      .insertAdjacentHTML("beforeend", profileSettingsTabHTML);

    document
      .querySelector("#" + obj.id + "_tab_body")
      .addEventListener("click", () => {
        selectProfileSettingsTab(obj);
      });
  });
};

// Select tab
let selectedProfileSettingsTabName;

const selectProfileSettingsTab = obj => {
  // Initial Checks
  if (selectedProfileSettingsTabName) {
    if (selectedProfileSettingsTabName == obj.name) {
      return;
    }
    // Deselect if theres any selected tabs
    deselectProfileSettingsTab();
  }
  // Change CSS
  document
    .querySelector("#" + obj.id + "_tab_body")
    .classList.add("profile_settings_tab_body_selected");
  document
    .querySelector("#" + obj.id + "_tab_text")
    .classList.add("profile_settings_tab_text_selected");
  // Execute method
  obj.method();
  // Update selected tab
  selectedProfileSettingsTabName = obj.name;
};

// Deselect Tab
const deselectProfileSettingsTab = () => {
  // Change CSS
  document
    .querySelector("#" + obj.id + "_tab_body")
    .classList.remove("profile_settings_tab_body_selected");
  document
    .querySelector("#" + obj.id + "_tab_text")
    .classList.remove("profile_settings_tab_text_selected");
};
