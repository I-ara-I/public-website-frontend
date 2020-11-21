<template>
  <v-app>
    <!-- Header -->
    <v-app-bar color="light lighten-1" app>
      <router-link class="text-decoration-none" :to="{ name: 'Home' }">
        <h1 class="black--text mr-5 font-weight-bold text-h4">
          {{ headerTitle
          }}<span class="grey--text font-weight-light">{{ tld }}</span>
        </h1></router-link
      >
      <v-toolbar-items class="hidden-sm-and-down"
        ><v-btn
          v-for="(link, index) in linksHeader"
          :key="index"
          :to="{ name: link.name }"
          exact
          depressed
        >
          {{ link.label }}
        </v-btn></v-toolbar-items
      >
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      light
      right
      temporary
      class="grey lighten-4"
    >
      <v-list nav dense>
        <v-list-item-group active-class="grey lighten-2">
          <div v-for="link in linksHeader" :key="link.label">
            <router-link :to="{ name: link.name }">
              <v-list-item>
                <v-list-item-title>
                  <span class="black--text">{{
                    link.label
                  }}</span></v-list-item-title
                >
              </v-list-item>
            </router-link>
          </div>
          <div v-for="link in linksFooter" :key="link.label">
            <router-link :to="{ name: link.name }" exact>
              <v-list-item>
                <v-list-item-title>
                  <span class="black--text">{{
                    link.label
                  }}</span></v-list-item-title
                >
              </v-list-item>
            </router-link>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Content -->
    <v-main class="grey lighten-4">
      <v-container class="mt-5">
        <transition
          enter-active-class="animate__animated animate__slideInLeft"
          leave-active-class="animate__animated animate__slideOutRight"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <!-- Footer -->

    <v-footer class="grey lighten-4" padless>
      <v-row justify="center" no-gutters>
        <v-col
          class="text-center grey--text text--darken-2 text-caption"
          cols="12"
        >
          <v-btn
            v-for="(link, index) in linksFooter"
            :key="index"
            color="grey darken-2"
            text
            rounded
            class="my-2"
            :to="{ name: link.name }"
            exact
          >
            {{ link.label }}
          </v-btn>
        </v-col>
        <v-col
          class="text-center grey--text text--darken-2 text-caption"
          cols="12"
        >
          &copy; {{ new Date().getFullYear() }} —
          <strong>{{ author }}</strong>
        </v-col>
        <v-col
          class="text-center grey--text text--darken-2 text-caption"
          cols="12"
          >Diese Webseite verwendet keine Cookies.</v-col
        >
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    linksHeader: [
      {
        name: "Home",
        label: "Übersicht",
      },
      {
        name: "Specification",
        label: "Spezifikationsrechner",
      },
    ],
    linksFooter: [
      {
        name: "Impressum",
        label: "Impressum",
      },
      {
        name: "Datenschutz",
        label: "Datenschutz",
      },
    ],
    drawer: false,
    author: process.env.VUE_APP_AUTHOR,
    headerTitle: process.env.VUE_APP_HEADER_TITLE,
    tld: process.env.VUE_APP_TLD,
  }),
};
</script>

<style>
.animate__animated.animate__slideInLeft,
.animate__animated.animate__slideOutRight {
  animation-duration: 300ms;
}

a {
  text-decoration: none;
}
</style>
