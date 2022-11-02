<template>
  <div>
    <Card>
      <Form :model="filterForm" :label-width="100" style="display: flex; margin:20px 0;">
        <formItem label="城市"> 
        <Select v-model="filterForm.city" style="width: 200px" @on-change="handleCityChange">
          <Option v-for="item in cityList" :value="item" :key="item">{{
            item
          }}</Option>
        </Select>
</formItem>

        <formItem label="区"> 
        <Select v-model="filterForm.district" style="width: 200px">
          <Option v-for="item in districtList" :value="item" :key="item">{{
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
import {getFieldList, getFourDataList, getDistrictList} from '@/api/data';

export default {
  name: "four",

  data() {
    return {
      columns: [
        { title: "城市", key: "city" },
        {title: "区", key: "district"},
        {title: "区域", key: "region"},
        {title: "数量", key: "count"},
        {title: "平均面积", key:"average"},
        {title: "最大面积", key:"max"},
        {title: "最小面积", key: "min"},
      ],
      data: [],
      filterForm: {},
      cityList: [],
      districtList: [],
      page: 1,
    };
  },

  methods: {
    getFieldLists(){
    getFieldList({field: 'city', type: 'String'}).then(res => {
        console.log(res);
        this.cityList = res.data;
    })
   },

   getDataList(){
        getFourDataList({...this.filterForm, page: this.page}).then(res =>{
        console.log('getThreeDataList', res);
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
   },
   handleCityChange(){
    getDistrictList(this.filterForm).then(res => {
      this.districtList = res.data;
    })
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