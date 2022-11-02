<template>
  <div>
    <Card>
      <Form :model="filterForm" :label-width="100" style="display: flex; margin:20px 0;">
        <formItem label="城市"> </formItem>
        <Select v-model="filterForm.city" style="width: 200px">
          <Option v-for="item in cityList" :value="item" :key="item">{{
            item
          }}</Option>
        </Select>
        <!-- <formItem label="户型">
          <Select v-model="filterForm.city" style="width: 200px">
            <Option v-for="item in typeList" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
        </formItem> -->

        <formItem label="租赁方式">
          <Select v-model="filterForm.leaseMode" style="width: 200px">
            <Option v-for="item in leaseList" :value="item" :key="item">{{
              item
            }}</Option>
          </Select>
        </formItem>
        <formItem>
            <Button type="warning" @click="query" style="margin-right: 20px;">查询</Button>
            <Button type="warning" @click="reset">重置</Button>
        </formItem>
      </Form>
    </Card>
    <Table :columns="columns" :data="data"></Table>
    <Page :total="1000" :page-size="15" style="width:400px; justify-self: end;" @on-change="pageChange"></Page>
  </div>
</template>

<script>
import {getFieldList, getOneDataList} from '@/api/data';

export default {
  name: "one",

  data() {
    return {
      columns: [
        { title: "城市", key: "city" },
        { title: "户型", key: "types" },
        { title: "整租/合租", key: "leaseMode" },
        { title: "均价", key: "average" },
        { title: "中位数", key: "medium" },
        { title: "最高价", key: "max" },
        { title: "最低价", key: "min" },
      ],
      data: [],
      filterForm: {},
      cityList: [],
    //   typeList: [],
      leaseList: [],
      page: 1,
    };
  },

  methods: {
    getFieldLists(){
    getFieldList({field: 'city', type: 'String'}).then(res => {
        console.log(res);
        this.cityList = res.data;
    })
    
    getFieldList({field: 'lease_mode', type: 'String'}).then(res => {
        console.log(res);
        this.leaseList = res.data;
    })
   },

   getDataList(){
        getOneDataList({...this.filterForm, page: this.page}).then(res =>{
        console.log('getOneDataList', res);
        this.data = res.data
    })
   },

   query(){
    this.getDataList();
   },
   reset(){
    this.filterForm = {}
    this.getDataList();
   },
   pageChange(page){
    this.page = page;
    this.getDataList();
   }
  },
    mounted() {
        this.getFieldLists();
        this.getDataList();
    },
};
</script>

<style lang="scss" scoped>
</style>