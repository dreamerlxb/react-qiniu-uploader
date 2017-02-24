import React, { PropTypes } from 'react';
import './MyInfo.css';

// 七牛图片url
const QINIU_URL = 'http://olepdhrf4.bkt.clouddn.com/';

// url
const BASE_URL = 'http://192.168.1.167:3000/api/';

// 编辑信息
export default class MyInfoEdit extends React.Component {

  constructor(props) {
    super(props);
  }

  /* eslint-disable */
  componentDidMount() {
    const me = this;
    this.uploader = Qiniu.uploader({
      runtimes: 'html5,flash,html4',      // 上传模式，依次退化
      browse_button: 'mypickfile',         // 上传选择的点选按钮，必需
      // uptoken: 'Dy6Npzhe0F3-QyVDNZ_2cRQ3VU244JT47GLYWeLt:r4fRiepT29xZvOVc-p_8Ok6SCeo=:eyJzY29wZSI6Im16LWR4IiwiZGVhZGxpbmUiOjE0ODcxNTA0MTd9',
      uptoken_url: `${BASE_URL}Images/uploadToken`,         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
      // get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
      domain: 'mz-dx',     // bucket域名，下载资源时用到，必需
      // container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
      max_file_size: '100mb',             // 最大文件体积限制
      flash_swf_url: 'https://cdn.staticfile.org/plupload/2.1.7/Moxie.swf',
      max_retries: 3,                     // 上传失败最大重试次数
      dragdrop: true,                     // 开启可拖曳上传
      // drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                  // 分块上传时，每块的体积
      unique_names: true,
      auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      filters: {
        mime_types : [ //只允许上传图片
            { title : "Image files", extensions : "jpg,jpeg,gif,png" },
        ],
        prevent_duplicates : false //不允许选取重复文件
      },
      init: {
        FilesAdded: function(up, files) {
          plupload.each(files, function(file) {
            // 文件添加进队列后，处理相关的事情
            // console.log('FilesAdded');
            // console.log(file);
          });
        },
        BeforeUpload: function(up, file) {
          // 每个文件上传前，处理相关的事情
          console.log('BeforeUpload');
          console.log(up);
          console.log(file);
        },
        UploadProgress: function(up, file) {
          // 每个文件上传时，处理相关的事情
          console.log('UploadProgress');
          console.log(up);
          console.log(file);
        },
        FileUploaded: function(up, file, info) {
          console.log('FileUploaded');
          console.log(up); //
          console.log(file); // {size: '图片大小', name: '图片的名字', type: '图片类型'}
          console.log(info); //格式：{"hash":"FoOYGEqUohVUIRU3_shTi-2BFrIC","key":"o_1b90g7g009i1hj9edgqorhu57.jpg"}
        },
        Error: function(up, err, errTip) {
          // 上传出错时，处理相关的事情
          console.log('Error');
          // message.error(errTip);
        },
        UploadComplete: function() {
          // 队列文件处理完毕后，处理相关的事情
          console.log('UploadComplete');
        }
      }
    });
  }

  render() {
    return (
			<div className="info-form">
        <div className="user-info-avatar">
          <label>头像</label>
          <div> <img id="mypickfile" src={ this.props.user.avatar ? this.props.user.avatar.url : me }/>
        <span>点击图片选择图片</span> </div>
        </div>
      </div>
    );
  }
}
