import _ from 'lodash'
import $ from 'jquery'
import '@/utils/reset.scss'
import './index.scss'
import flexible from '@/utils/flexible'
import { api, qiniuRoot } from '@/config'
import { showMessage, getQueryVariable } from '@/utils/common'
let redpacketObj

let memberNum = getQueryVariable('memberNum')
console.log(_)
$(window).on('resize', resetHeight)
resetHeight()
$.ajax({
  type: 'get',
  url: api + '/activity/magicPeni/getUserDoodle',
  data: {
    memberNum: memberNum
  },
  success (res) {
    if (res.error === 0) {
      redpacketObj = res.obj
      res.obj.todayDoodles.forEach((todayDoodle, index) => {
        $($('.img')[index])
          .attr('src', qiniuRoot + todayDoodle.doodleName)
          .show()
      })
      $('#num').text(res.obj.memberNumCount)
      if (
        redpacketObj.todayDoodles.length < 3 ||
        redpacketObj.redPackets.length === 0
      ) {
        grayBtn()
      }
    } else {
      showMessage('出错了！请稍后重试！')
    }
  }
})
$('#draw').on('click', function () {
  // actionIn('#red-packet', 'action_translateY', 0.4, '')
  let redPacket = redpacketObj.redPackets[0] || []
  if (
    redpacketObj.todayDoodles.length >= 3 &&
    redpacketObj.redPackets.length > 0
  ) {
    $('.modal')
      .fadeIn()
      .find('.red-packet,.close')
      .animate({
        height: 'toggle',
        width: 'toggle'
      })
      .animate({
        height: 'toggle',
        width: 'toggle'
      })
    $('#red-packet')
      .find('.money .num')
      .text((redPacket.money / 100).toFixed(2))
    $('#red-packet')
      .find('.blessing')
      .html(redPacket.packetName)
    // .text(redPacket.packetName)
    $.ajax({
      type: 'get',
      url: api + '/activity/magicPeni/sendRedPacket',
      data: {
        memberNum: memberNum
      },
      success (res) {
        redpacketObj.redPackets.splice(0, 1)
        if (redpacketObj.redPackets.length === 0) {
          grayBtn()
        }
      }
    })
  } else if (
    redpacketObj.todayDoodles.length >= 3 &&
    redpacketObj.redPackets.length === 0
  ) {
    showMessage('红包已领取！')
    grayBtn()
  } else if (redpacketObj.todayDoodles.length < 3) {
    showMessage('未集齐红包不可领取！')
    grayBtn()
  } else {
    console.log('error')
  }
})
$('#close').on('click', function () {
  // actionOut('#red-packet', 'action_translateYOut', 0.4, '')
  $('.modal').fadeOut()
})

function grayBtn () {
  $('#draw').addClass('gray')
}

function resetHeight () {
  flexible(window)
  let coefficient = ($(window).height() / $(window).width()) * 5.1
  $('.bg').css('padding-top', coefficient * 0.45 + 'rem')
  $('.row').css('margin-top', coefficient * 0.05 + 'rem')
  $('.text').css('margin-top', coefficient * 0.02 + 'rem')
  $('.btnrow').css('bottom', coefficient * 0.1 + 'rem')
}
