import $ from 'jquery'
import '@/utils/reset.scss'
import './index.scss'
import flexible from '@/utils/flexible'
$(window).on('resize', resetHeight)
resetHeight()
function resetHeight () {
  flexible(window)
  let coefficient = ($(window).height() / $(window).width()) * 5.1
  $('.bg').css('padding-top', coefficient * 0.45 + 'rem')
  $('.row').css('margin-top', coefficient * 0.05 + 'rem')
  $('.text').css('margin-top', coefficient * 0.02 + 'rem')
  $('.btnrow').css('bottom', coefficient * 0.1 + 'rem')
}
