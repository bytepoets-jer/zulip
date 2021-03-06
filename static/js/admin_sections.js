var admin_sections = (function () {

var exports = {};

var is_loaded = new Dict(); // section -> bool

exports.maybe_disable_widgets = function () {
    if (page_params.is_admin) {
        return;
    }

    // Ideally we'd do this on a per-page basis, but there
    // are some tactical advantages of having all this code
    // in the same place.

    $(".organization-box [data-name='organization-profile']")
        .find("input, textarea, button, select").attr("disabled", true);
    $(".organization-box [data-name='organization-settings']")
        .find("input, textarea, button, select").attr("disabled", true);
    $(".organization-box [data-name='organization-permissions']")
        .find("input, textarea, button, select").attr("disabled", true);
    $(".organization-box [data-name='auth-methods']")
        .find("input, button, select, checked").attr("disabled", true);
    $(".organization-box [data-name='default-streams-list']")
        .find("input:not(.search), button, select").attr("disabled", true);
    $(".organization-box [data-name='filter-settings']")
        .find("input, button, select").attr("disabled", true);
    $(".organization-box [data-name='profile-field-settings']")
        .find("input, button, select").attr("disabled", true);
    $(".control-label-disabled").addClass('enabled');
};

exports.load_admin_section = function (name) {
    var section;

    switch (name) {
    case 'organization-profile':
    case 'organization-settings':
    case 'organization-permissions':
    case 'auth-methods':
        section = 'org';
        break;
    case 'emoji-settings':
        section = 'emoji';
        break;
    case 'bot-list-admin':
    case 'user-list-admin':
    case 'deactivated-users-admin':
        section = 'users';
        break;
    case 'default-streams-list':
        section = 'streams';
        break;
    case 'filter-settings':
        section = 'filters';
        break;
    case 'invites-list-admin':
        section = 'invites';
        break;
    case 'user-groups-admin':
        section = 'user-groups';
        break;
    case 'profile-field-settings':
        section = 'profile-fields';
        break;
    default:
        blueslip.error('Unknown admin id ' + name);
        return;
    }

    if (is_loaded.get(section)) {
        // We only load sections once (unless somebody calls
        // reset_sections).
        return;
    }

    switch (section) {
    case 'org':
        settings_org.set_up();
        break;
    case 'emoji':
        settings_emoji.set_up();
        break;
    case 'users':
        settings_users.set_up();
        break;
    case 'streams':
        settings_streams.set_up();
        break;
    case 'filters':
        settings_filters.set_up();
        break;
    case 'invites':
        settings_invites.set_up();
        break;
    case 'user-groups':
        settings_user_groups.set_up();
        break;
    case 'profile-fields':
        settings_profile_fields.set_up();
        break;
    default:
        blueslip.error('programming error for section ' + section);
        return;
    }

    exports.maybe_disable_widgets();

    is_loaded.set(section, true);
};

exports.reset_sections = function () {
    is_loaded.clear();
    settings_org.reset();
    settings_emoji.reset();
    settings_users.reset();
    settings_streams.reset();
    settings_filters.reset();
    settings_invites.reset();
    settings_user_groups.reset();
    settings_profile_fields.reset();
};

return exports;
}());

if (typeof module !== 'undefined') {
    module.exports = admin_sections;
}
window.admin_sections = admin_sections;
