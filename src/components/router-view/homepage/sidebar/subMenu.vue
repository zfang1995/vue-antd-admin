<template functional>
  <a-sub-menu v-on="listeners" :key="data.key">
    <span slot="title" v-if="data.attrs.menuInfo.meta">
      <a-icon v-if="data.attrs.menuInfo.meta.aIcon" :type="data.attrs.menuInfo.meta.aIcon"/>
      <icon-font v-else :type="data.attrs.menuInfo.meta.iconFont"></icon-font>
      <span>{{ data.attrs.internationalize(data.attrs.menuInfo.meta.title || data.attrs.menuInfo.name) }}</span>
    </span>
    <template v-for="route in data.attrs.menuInfo.children">
      <a-menu-item v-if="!route.children" :to="route.path" :key="route.path" :class="(selectedTab && selectedTab.fullPath === route.path) ? 'ant-menu-item-selected' : ''">
        <app-link :to="route.path" :_slot="'title'" v-if="route.meta">
          <a-icon v-if="route.meta.aIcon" :type="route.meta.aIcon"/>
          <icon-font v-else :type="route.meta.iconFont"></icon-font>
          <span>{{ data.attrs.internationalize(route.meta.title || route.name) }}</span>
        </app-link>
      </a-menu-item>
      <sub-menu v-else :is-nest="true" :menuInfo="route" :key="route.path" class="nest-menu"></sub-menu>
    </template>
  </a-sub-menu>
</template>