<template>
              <v-client-table
              ref="itemsTable"
              :columns="tableColumnsItems"
              :options="tableOptions"
              :data="row.propertiesItems"
            >
</template>