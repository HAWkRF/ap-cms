export default {
  install(Vue) {
    Vue.prototype.$isAccessChangeData = function (userId, block) {
      let canChange = false;

      const profile = this.$store.getters.getProfile;
      const isOwnData = (userId == profile.id ? true : false);
      const isAvailableChild = this.$store.getters.hasAvailableChild(userId);
      const isAvailableParents = this.$store.getters.hasAvailableParents(userId);
      const isAvailableClients = this.$store.getters.hasAvailableClients(userId);
      const isAvailableClientsParents = this.$store.getters.hasAvailableClientsParents(userId);

      switch (block) {
        case 'permissions':
          if (this.$can('userPermissionEdit')) {
            canChange = true;
          }
          break;
        case 'profile':
          if (this.$can('userProfileEdit') ||
              (this.$can('userOwnProfileEdit') && isOwnData) ||
              (this.$can('userChildProfileEdit') && isAvailableChild) ||
              (this.$can('userParentProfileEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsProfileEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsProfileEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'contact':
          if (this.$can('userAccountEdit') ||
              (this.$can('userOwnAccountEdit') && isOwnData) ||
              (this.$can('userChildAccountEdit') && isAvailableChild) ||
              (this.$can('userParentAccountEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsAccountEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsAccountEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'kinsfolk':
          if (this.$can('userKinsfolkEdit') ||
              (this.$can('userOwnKinsfolkEdit') && isOwnData) ||
              (this.$can('userChildKinsfolkEdit') && isAvailableChild) ||
              (this.$can('userParentKinsfolkEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsKinsfolkEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsKinsfolkEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'activities':
          if (this.$can('userActivityEdit') ||
              (this.$can('userOwnActivityEdit') && isOwnData) ||
              (this.$can('userChildActivityEdit') && isAvailableChild) ||
              (this.$can('userParentActivityEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsActivityEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsActivityEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'params':
          if (this.$can('userParamsEdit') ||
              (this.$can('userOwnParamsEdit') && isOwnData) ||
              (this.$can('userChildParamsEdit') && isAvailableChild) ||
              (this.$can('userParentParamsEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsParamsEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsParamsEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'medCard':
          if (this.$can('userMedCardEdit') ||
              (this.$can('userOwnMedCardEdit') && isOwnData) ||
              (this.$can('userChildMedCardEdit') && isAvailableChild) ||
              (this.$can('userParentMedCardEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsMedCardEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsMedCardEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'documents':
          if (this.$can('userDocumentEdit') ||
              (this.$can('userOwnDocumentEdit') && isOwnData) ||
              (this.$can('userChildDocumentEdit') && isAvailableChild) ||
              (this.$can('userParentDocumentEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsDocumentEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsDocumentEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'workCard':
          if (this.$can('userWorkCardEdit') ||
              (this.$can('userOwnWorkCardEdit') && isOwnData) ||
              (this.$can('userChildWorkCardEdit') && isAvailableChild) ||
              (this.$can('userParentWorkCardEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsWorkCardEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsWorkCardEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'educationCard':
          if (this.$can('userEducationCardEdit') ||
              (this.$can('userOwnEducationCardEdit') && isOwnData) ||
              (this.$can('userChildEducationCardEdit') && isAvailableChild) ||
              (this.$can('userParentEducationCardEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsEducationCardEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsEducationCardEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'passport':
          if (this.$can('userPassportEdit') ||
              (this.$can('userOwnPassportEdit') && isOwnData) ||
              (this.$can('userChildPassportEdit') && isAvailableChild) ||
              (this.$can('userParentPassportEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsPassportEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsPassportEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
        case 'birthCertificate':
          if (this.$can('userBirthCertificateEdit') ||
              (this.$can('userOwnBirthCertificateEdit') && isOwnData) ||
              (this.$can('userChildBirthCertificateEdit') && isAvailableChild) ||
              (this.$can('userParentBirthCertificateEdit') && isAvailableParents) ||
              (this.$can('userAvailableClientsBirthCertificateEdit') && isAvailableClients) ||
              (this.$can('userAvailableParentsBirthCertificateEdit') && isAvailableClientsParents)) {
            canChange = true;
          }
          break;
      }

      return canChange;
    };

    Vue.prototype.$isAccessViewData = function (userId, block) {
      let canView = false;

      const profile = this.$store.getters.getProfile;
      const isOwnData = (userId == profile.id ? true : false);
      const isAvailableChild = this.$store.getters.hasAvailableChild(userId);
      const isAvailableParents = this.$store.getters.hasAvailableParents(userId);
      const isAvailableClients = this.$store.getters.hasAvailableClients(userId);
      const isAvailableClientsParents = this.$store.getters.hasAvailableClientsParents(userId);

      switch (block) {
        case 'permissions':
          if (this.$can('userPermissionEdit')) {
            canView = true;
          }
          break;
        case 'profile':
          if (this.$can('userProfileView') ||
              (this.$can('userOwnProfileView') && isOwnData) ||
              (this.$can('userChildProfileView') && isAvailableChild) ||
              (this.$can('userParentProfileView') && isAvailableParents) ||
              (this.$can('userAvailableClientsProfileView') && isAvailableClients) ||
              (this.$can('userAvailableParentsProfileView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'contact':
          if (this.$can('userAccountView') ||
              (this.$can('userOwnAccountView') && isOwnData) ||
              (this.$can('userChildAccountView') && isAvailableChild) ||
              (this.$can('userParentAccountView') && isAvailableParents) ||
              (this.$can('userAvailableClientsAccountView') && isAvailableClients) ||
              (this.$can('userAvailableParentsAccountView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'kinsfolk':
          if (this.$can('userKinsfolkView') ||
              (this.$can('userOwnKinsfolkView') && isOwnData) ||
              (this.$can('userChildKinsfolkView') && isAvailableChild) ||
              (this.$can('userParentKinsfolkView') && isAvailableParents) ||
              (this.$can('userAvailableClientsKinsfolkView') && isAvailableClients) ||
              (this.$can('userAvailableParentsKinsfolkView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'activities':
          if (this.$can('userActivityView') ||
              (this.$can('userOwnActivityView') && isOwnData) ||
              (this.$can('userChildActivityView') && isAvailableChild) ||
              (this.$can('userParentActivityView') && isAvailableParents) ||
              (this.$can('userAvailableClientsActivityView') && isAvailableClients) ||
              (this.$can('userAvailableParentsActivityView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'params':
          if (this.$can('userParamsView') ||
              (this.$can('userOwnParamsView') && isOwnData) ||
              (this.$can('userChildParamsView') && isAvailableChild) ||
              (this.$can('userParentParamsView') && isAvailableParents) ||
              (this.$can('userAvailableClientsParamsView') && isAvailableClients) ||
              (this.$can('userAvailableParentsParamsView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'medCard':
          if (this.$can('userMedCardView') ||
              (this.$can('userOwnMedCardView') && isOwnData) ||
              (this.$can('userChildMedCardView') && isAvailableChild) ||
              (this.$can('userParentMedCardView') && isAvailableParents) ||
              (this.$can('userAvailableClientsMedCardView') && isAvailableClients) ||
              (this.$can('userAvailableParentsMedCardView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'documents':
          if (this.$can('userDocumentView') ||
              (this.$can('userOwnDocumentView') && isOwnData) ||
              (this.$can('userChildDocumentView') && isAvailableChild) ||
              (this.$can('userParentDocumentView') && isAvailableParents) ||
              (this.$can('userAvailableClientsDocumentView') && isAvailableClients) ||
              (this.$can('userAvailableParentsDocumentView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'workCard':
          if (this.$can('userWorkCardView') ||
              (this.$can('userOwnWorkCardView') && isOwnData) ||
              (this.$can('userChildWorkCardView') && isAvailableChild) ||
              (this.$can('userParentWorkCardView') && isAvailableParents) ||
              (this.$can('userAvailableClientsWorkCardView') && isAvailableClients) ||
              (this.$can('userAvailableParentsWorkCardView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'educationCard':
          if (this.$can('userEducationCardView') ||
              (this.$can('userOwnEducationCardView') && isOwnData) ||
              (this.$can('userChildEducationCardView') && isAvailableChild) ||
              (this.$can('userParentEducationCardView') && isAvailableParents) ||
              (this.$can('userAvailableClientsEducationCardView') && isAvailableClients) ||
              (this.$can('userAvailableParentsEducationCardView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'passport':
          if (this.$can('userPassportView') ||
              (this.$can('userOwnPassportView') && isOwnData) ||
              (this.$can('userChildPassportView') && isAvailableChild) ||
              (this.$can('userParentPassportView') && isAvailableParents) ||
              (this.$can('userAvailableClientsPassportView') && isAvailableClients) ||
              (this.$can('userAvailableParentsPassportView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
        case 'birthCertificate':
          if (this.$can('userBirthCertificateView') ||
              (this.$can('userOwnBirthCertificateView') && isOwnData) ||
              (this.$can('userChildBirthCertificateView') && isAvailableChild) ||
              (this.$can('userParentBirthCertificateView') && isAvailableParents) ||
              (this.$can('userAvailableClientsBirthCertificateView') && isAvailableClients) ||
              (this.$can('userAvailableParentsBirthCertificateView') && isAvailableClientsParents)) {
            canView = true;
          }
          break;
      }

      return canView;
    };

    Vue.prototype.$can = function (permission) {
      return this.$store.getters.hasPermission(permission);
    };
    Vue.prototype.$cannot = function (permission) {
      return !this.$store.getters.hasPermission(permission);
    }
  }
};